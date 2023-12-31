/**
 * За основу взят этот код:
 * https://gist.github.com/joshpensky/426d758c5779ac641d1d09f9f5894153
 */

import React, { useState, useRef, useEffect } from "react";
import {
    checkSum,
    LineBreakTransformer,
    parseReceivedData,
    prepareStartingParams,
    ReceivedData,
    StartingParam,
} from "../../utils/Serial";
import SerialControlButtons from "./SerialControlButtons";
import MnemoScheme from "./MnemoScheme";
import { v4 as uuidv4 } from "uuid";

import { Row, Col } from "antd";

type PortState = "closed" | "closing" | "open" | "opening";

const SerialPortUI = () => {
    const [canUseSerial] = useState(() => "serial" in navigator);
    const [portState, setPortState] = useState<PortState>("closed");

    const [startingParams, setStartingParams] = useState<StartingParam[]>([]);
    const [serialData, setSerialData] = useState<ReceivedData[]>([]);
    const [serialDataArray, setSerialDataArray] = useState<any>([]);

    const portRef = useRef<SerialPort | null>(null);
    const readerRef = useRef<ReadableStreamDefaultReader | null>(null);
    const readerClosedPromiseRef = useRef<Promise<void>>(Promise.resolve());

    /**
     *  Вызов меню с выбором последовательного порта
     */
    const manualConnectToPort = async () => {
        if (canUseSerial) {
            try {
                portRef.current = await navigator.serial.requestPort();
                return true;
            } catch (error) {
                console.error("Пользователь не выбрал порт");
            }
        }
        return false;
    };

    /**
     * Открываем порт со скоростью работы 9600 бод
     */
    const openPort = async (port: SerialPort) => {
        try {
            await port.open({ baudRate: 9600 });
            console.log("Port open");
            portRef.current = port;
            setPortState("open");
        } catch (error) {
            setPortState("closed");
            console.error("Не удалось открыть порт");
        }
    };

    /**
     * Отправка сообщения через последовательный порт
     * @param message текст сообщения
     */
    const writeToSerial = async (message: string) => {
        if (portRef.current?.writable) {
            console.log("writeToSerial", message);
            const encoder = new TextEncoder();
            const writer = portRef.current.writable.getWriter();
            await writer.write(encoder.encode(message));
            writer.releaseLock();
        }
    };

    /**
     * Отправляем команду на страт
     */
    const handleStart = async () => {
        const params = prepareStartingParams(startingParams);
        await writeToSerial(params);
    };

    /**
     * Запускаем эксперимент: открываем порт и отправляем команду на старт
     */
    const manualOpenPort = async () => {
        if (canUseSerial && portState === "closed" && portRef.current) {
            setPortState("opening");
            try {
                setSerialDataArray([]); // для очистки графиков
                await openPort(portRef.current);
                setTimeout(handleStart, 2000); // ждём 2 секунды перед отправкой команды на старт
                return true;
            } catch (error) {
                setPortState("closed");
                console.error("Порт не выбран");
            }
        }
        return false;
    };

    /**
     * Чтение сообщений от последовательного порта до его закрытия
     *
     * @param port из какого порта читать
     */
    const readUntilClosed = async (port: SerialPort) => {
        if (port.readable) {
            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = port.readable.pipeTo(
                textDecoder.writable
            );

            readerRef.current = textDecoder.readable
                .pipeThrough(new TransformStream(new LineBreakTransformer()))
                .getReader();

            try {
                while (true) {
                    const { value, done } = await readerRef.current.read();
                    if (done) {
                        break;
                    }

                    // меняем state только если сходится контрольная сумма
                    if (checkSum(value)) {
                        const parsedSerialData = parseReceivedData(value);
                        // setSerialDataArray((data: any) => [
                        //     ...data,
                        //     {
                        //         x: data.length * 0.1,
                        //         y: parsedSerialData[0].value,
                        //     },
                        // ]);

                        setSerialData(parsedSerialData); // отправляем данные в обработчик
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                readerRef.current.releaseLock();
            }

            await readableStreamClosed.catch(() => {}); // Ignore the error
        }
    };

    /**
     * Закрываем порт
     */
    const manualDisconnectFromPort = async () => {
        if (canUseSerial && portState === "open") {
            const port = portRef.current;
            if (port) {
                setPortState("closing");

                // Cancel any reading from port
                await readerRef.current?.cancel(); // todo может быть ошибка, await может быть лишним
                await readerClosedPromiseRef.current;
                readerRef.current = null;

                // Close and nullify the port
                await port.close();
                //portRef.current = null;
                console.log("Port closed");
                // Update port state
                setPortState("closed");
            }
        }
    };

    /**
     * Обработчик неожиданного отключение порта
     */
    const onPortDisconnect = async () => {
        // Wait for the reader to finish it's current loop
        await readerClosedPromiseRef.current;
        // Update state
        readerRef.current = null;
        readerClosedPromiseRef.current = Promise.resolve();
        // portRef.current = null;
        setPortState("closed");
    };

    // обработка изменения состояния порта
    useEffect(() => {
        const port = portRef.current;
        if (portState === "open" && port) {
            // When the port is open, read until closed
            const aborted = { current: false };
            readerRef.current?.cancel();
            readerClosedPromiseRef.current.then(() => {
                if (!aborted.current) {
                    readerRef.current = null;
                    readerClosedPromiseRef.current = readUntilClosed(port);
                }
            });

            // Attach a listener for when the device is disconnected
            navigator.serial.addEventListener("disconnect", onPortDisconnect);

            return () => {
                aborted.current = true;
                navigator.serial.removeEventListener(
                    "disconnect",
                    onPortDisconnect
                );
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portState]);

    /**
     * Создание входного параметра
     */
    const handleCreateParam = () => {
        console.log("add param", startingParams.length);
        const param: StartingParam = {
            value: 0, // начальное значение
            name: `Param ${startingParams.length + 1}`, // стартовое имя
            id: uuidv4(), // уникальный индентификатор параметра
        };

        // добавляем новый к массиву уже существующих параметров
        setStartingParams([...startingParams, param]);
    };

    /**
     * Обновление значения или названия входного параметра
     * @param data входной параметр
     */
    const handleParamUpdate = (data: StartingParam) => {
        //console.log(data);
        const changedParams = startingParams.filter(
            (item) => item.id !== data.id
        );
        setStartingParams([...changedParams, data]);
    };

    /**
     * Удаление входного параметра
     * @param id идентификатор параметра
     */
    const handleParamDelete = (id: string) => {
        const changedParams = startingParams.filter((item) => item.id !== id);
        setStartingParams(changedParams);
    };

    return (
        <>
            <Row gutter={24}>
                <Col span={6}>
                    <SerialControlButtons
                        onSelectPort={manualConnectToPort}
                        onStart={manualOpenPort}
                        onStop={manualDisconnectFromPort}
                    />
                </Col>
                <Col span={18}>
                    <MnemoScheme
                        watchedData={serialData}
                        startingParams={startingParams}
                        onCreateParam={handleCreateParam}
                        onUpdateParam={handleParamUpdate}
                        onDeleteParam={handleParamDelete}
                        plotData={serialDataArray}
                    />
                </Col>
            </Row>
        </>
    );
};

export default SerialPortUI;
