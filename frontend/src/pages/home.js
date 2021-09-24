import React, { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import ExportContent from '../services/api';


function Home() {


    const [content, setContent] = useState();
    const [ramdom, setRamdom] = useState();
    const [currentEvent, setCurrentEvent] = useState();

    useEffect(() => {
        const exportContent = ExportContent()
        setContent(exportContent.descricaoHexagono)

    }, [])


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function setRamdomValue() {
        setRamdom(getRandomInt(content?.paisagem1d6?.rangeDado[0], content?.paisagem1d6?.rangeDado[1]))
    }


    return (
        <div className="row m-5">
            <Card style={{ height: '80vh' }} className="text-center m-3 col-lg-4 col-sm-12">
                <Card.Body>
                    <Card.Title>Gerador de eventos</Card.Title>
                    <Form.Select onChange={(e => setCurrentEvent(e.target.value))} aria-label="Default select example">
                        <option value={null}></option>
                        <option value="DESCRIÇÃO DE HEXAGONO">DESCRIÇÃO DE HEXAGONO</option>
                        <option value="ROLAGEM DE CENARIO">ROLAGEM DE CENARIO</option>
                        <option value="ASSENTAMENTO">ASSENTAMENTO</option>
                    </Form.Select>
                </Card.Body>
                <Button className="mt-3 mb-3" onClick={() => { setRamdomValue() }} variant="outline-success" >
                    Gerar
                </Button>
            </Card>
            {
                currentEvent === 'DESCRIÇÃO DE HEXAGONO' && (
                    <div className="col-6 m-3">
                        <h1>{content?.titulo}</h1>
                        <h2>{content?.subtitulo}</h2>
                        <hr></hr>
                        <h3>{content?.paisagem1d6.titulo}</h3>

                        <h4>valor randomico 1-6: {ramdom}</h4>
                        {content?.paisagem1d6?.eventos.map((value) => {
                            if (value?.rangeDado[0] >= ramdom && value?.rangeDado[0] <= ramdom || value?.rangeDado[1] >= ramdom && value?.rangeDado[1] <= ramdom) {
                                return (
                                    <p>{value.conteudo}</p>
                                )
                            }
                        }
                        )}
                    </div>
                )
            }

        </div>
    )
}

export default Home