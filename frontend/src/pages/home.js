import React, { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import { descricaoHexagono } from '../json/descricaoHexagono.json';
import { assentamento } from '../json/assentamento.json';
import { ruinas } from '../json/ruinas.json';


function Home() {
    const [currentEvent, setCurrentEvent] = useState('DESCRIÇÃO DE HEXAGONO');
    const [hexaganoContent, setHexagonoContent] = useState();
    const [assentamentoContent, setAssentamentoContent] = useState();
    const [ruinasContent, setRuinasContent] = useState();

    useEffect(() => {
        setHexagonoContent(descricaoHexagono)
        setAssentamentoContent(assentamento)
        setRuinasContent(ruinas)
    }, [])


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function clearRamdomAndSetEvent(e) {
        setCurrentEvent(e.target.value)
        setRamdomHex(null)
        setRamdomAssentamento(null)
        setRamdomRuinas(null)
    }

    const [ramdomHex, setRamdomHex] = useState();
    function renderHexagono() {
        return (
            <>
                <Card.Title>Gerador de eventos</Card.Title>
                <div className="row">
                    <div className="col-10">
                        <Form.Select onChange={(e => clearRamdomAndSetEvent(e))} aria-label="Default select example">
                            <option value="DESCRIÇÃO DE HEXAGONO">DESCRIÇÃO DE HEXAGONO</option>
                            <option value="ASSENTAMENTO">ASSENTAMENTO</option>
                            <option value="RUINAS">RUINAS</option>
                        </Form.Select>
                    </div>
                    <Button className="col-2" onClick={() => { setRamdomHex(getRandomInt(hexaganoContent?.paisagem1d6?.rangeDado[0], hexaganoContent?.paisagem1d6?.rangeDado[1])) }} variant="outline-light" >
                        Gerar
                    </Button>
                </div>
                {/* </Card> */}
                <div className="col-6 m-3">
                    <h1>{hexaganoContent?.titulo}</h1>
                    <h2>{hexaganoContent?.subtitulo}</h2>
                    <hr></hr>
                    <h3>{hexaganoContent?.paisagem1d6.titulo}</h3>

                    <h4>valor randomico 1-6: {ramdomHex}</h4>
                    {hexaganoContent?.paisagem1d6?.eventos.map((value) => {
                        if (ramdomHex >= value?.rangeDado[0] && ramdomHex <= value?.rangeDado[1] || ramdomHex === value?.rangeDado[0]) {
                            return (
                                <p>{value?.conteudo}</p>
                            )
                        }
                    }
                    )}
                </div>
            </>
        )
    }

    const [ramdomAssentamento, setRamdomAssentamento] = useState();
    function renderAssentamento() {
        let ocupantePredominante1d20 = getRandomInt(1, 20)
        let especificacoes1d6 = getRandomInt(1, 6)
        return (
            <>
                <Card.Title>Gerador de eventos</Card.Title>
                <div className="row">
                    <div className="col-10">
                        <Form.Select onChange={(e => clearRamdomAndSetEvent(e))} aria-label="Default select example">
                            <option value="DESCRIÇÃO DE HEXAGONO">DESCRIÇÃO DE HEXAGONO</option>
                            <option value="ASSENTAMENTO">ASSENTAMENTO</option>
                            <option value="RUINAS">RUINAS</option>
                        </Form.Select>
                    </div>
                    <Button className="col-2" onClick={() => { setRamdomAssentamento(getRandomInt(assentamentoContent?.tipoDeAssentamento1d20?.rangeDado[0], assentamentoContent?.tipoDeAssentamento1d20?.rangeDado[1])) }} variant="outline-light" >
                        Gerar
                    </Button>
                </div>
                <div className="col-6 m-3">
                    <h1>{assentamentoContent?.titulo}</h1>
                    <h2>{assentamentoContent?.tipoDeAssentamento1d20?.titulo}</h2>
                    <h4>valor randomico 1-20: {ramdomAssentamento}</h4>
                    {assentamentoContent?.tipoDeAssentamento1d20?.eventos.map((value) => {
                        if (ramdomAssentamento >= value?.rangeDado[0] && ramdomAssentamento <= value?.rangeDado[1] || ramdomAssentamento === value?.rangeDado[0]) {
                            return (
                                <p>{value.conteudo}</p>
                            )
                        }
                    }
                    )}
                    <hr></hr>
                    <h2>{assentamentoContent?.ocupantePredominante1d20?.titulo}</h2>
                    <h4>valor randomico 1-20: {ocupantePredominante1d20}</h4>
                    {assentamentoContent?.ocupantePredominante1d20?.eventos.map((value) => {
                        if (ramdomAssentamento && ocupantePredominante1d20 >= value?.rangeDado[0] && ocupantePredominante1d20 <= value?.rangeDado[1] || ocupantePredominante1d20 === value?.rangeDado[0]) {
                            return (
                                <>
                                    <p>{value.conteudo}</p>
                                    <h2 className="mb-0">{`${value.especificacoes.titulo} ${value.especificacoes.subtitulo}`}: </h2>
                                    {value.especificacoes.eventos.map((value) => {
                                        if (especificacoes1d6 === value?.rangeDado[0]) {
                                            return (
                                                <>
                                                    <h4>valor randomico 1-6: {especificacoes1d6}</h4>
                                                    <p>{value.conteudo}</p>
                                                </>
                                            )
                                        }
                                    })}
                                </>
                            )
                        }
                    }
                    )}
                    {/* <h2>{assentamentoContent?.habitacao?.titulo}</h2> */}
                </div>
            </>
        )
    }

    const [ramdomRuinas, setRamdomRuinas] = useState();
    function renderRuinas() {
        let especificandoConstrucoes1d20 = getRandomInt(1, 20)
        let localizacao1d20 = getRandomInt(1, 20)
        let construidaParaQualProposito1d20 = getRandomInt(1, 20)
        let atualPropositod20 = getRandomInt(1, 20)
        let primeirosHabitantesd20 = getRandomInt(1, 20)
        let idadeRuinad20 = getRandomInt(1, 20)
        let idadeRuinaHumanad20 = getRandomInt(1, 20)
        let ocupacao1Quantod20 = getRandomInt(1, 20)
        let ocupacao2Quemd20 = getRandomInt(1, 20)
        let especificandoHumanosd20 = getRandomInt(1, 20)
        let hasHumans = false

        return (
            <>
                <Card.Title>Gerador de eventos</Card.Title>
                <div className="row">
                    <div className="col-10">
                        <Form.Select onChange={(e => clearRamdomAndSetEvent(e))} aria-label="Default select example">
                            <option value="DESCRIÇÃO DE HEXAGONO">DESCRIÇÃO DE HEXAGONO</option>
                            <option value="ASSENTAMENTO">ASSENTAMENTO</option>
                            <option value="RUINAS">RUINAS</option>
                        </Form.Select>
                    </div>
                    <Button className="col-2" onClick={() => { setRamdomRuinas(getRandomInt(ruinas?.tipoDeRuina1d20.rangeDado[0], ruinas?.tipoDeRuina1d20.rangeDado[1])) }} variant="outline-light" >
                        Gerar
                    </Button>
                </div>

                <div className="col-6 m-3">
                    <h1>{ruinas?.titulo}</h1>
                    <h2>{ruinas?.tipoDeRuina1d20.titulo}</h2>
                    <h4>valor randomico 1-8: {ramdomRuinas}</h4>
                    {ruinas?.tipoDeRuina1d20.eventos.map((value) => {
                        if (ramdomRuinas >= value?.rangeDado[0] && ramdomRuinas <= value?.rangeDado[1] || ramdomRuinas === value?.rangeDado[0]) {
                            return (
                                <>
                                    <p>{value?.conteudo}</p>
                                </>
                            )
                        }
                    })}
                    <hr></hr>
                    <h2>{ruinas?.especificandoConstrucoes1d20.titulo}</h2>
                    <h4>valor randomico 1-20: {especificandoConstrucoes1d20}</h4>
                    {ruinas?.especificandoConstrucoes1d20.eventos.map((value) => {
                        if (especificandoConstrucoes1d20 >= value?.rangeDado[0] && especificandoConstrucoes1d20 <= value?.rangeDado[1] || especificandoConstrucoes1d20 === value?.rangeDado[0]) {
                            return (
                                <>
                                    <p>{value?.conteudo}</p>
                                </>
                            )
                        }
                    })}
                    <hr></hr>
                    <h2>{ruinas?.localizacao1d20.titulo}</h2>
                    <h4>valor randomico 1-20: {localizacao1d20}</h4>
                    {ruinas?.localizacao1d20.eventos.map((value) => {
                        if (localizacao1d20 >= value?.rangeDado[0] && localizacao1d20 <= value?.rangeDado[1] || localizacao1d20 === value?.rangeDado[0]) {
                            return (
                                <>
                                    <p>{value?.conteudo}</p>
                                </>
                            )
                        }
                    })}
                    <hr></hr>
                    <h2>{ruinas?.construidaParaQualProposito1d20.titulo}</h2>
                    <h4>valor randomico 1-20: {construidaParaQualProposito1d20}</h4>
                    {ruinas?.construidaParaQualProposito1d20.eventos.map((value) => {
                        if (localizacao1d20 >= value?.rangeDado[0] && localizacao1d20 <= value?.rangeDado[1] || localizacao1d20 === value?.rangeDado[0]) {
                            return (
                                <>
                                    <p>{value?.conteudo}</p>
                                </>
                            )
                        }
                    })}
                    <hr></hr>
                    <h2>{ruinas?.atualPropositod20.titulo}</h2>
                    <h4>valor randomico 1-20: {atualPropositod20}</h4>
                    {ruinas?.atualPropositod20.eventos.map((value) => {
                        if (atualPropositod20 >= value?.rangeDado[0] && atualPropositod20 <= value?.rangeDado[1] || atualPropositod20 === value?.rangeDado[0]) {
                            return (
                                <>
                                    <p>{value?.conteudo}</p>
                                </>
                            )
                        }
                    })}
                    <hr></hr>
                    <h2>{ruinas?.especificandoRuina.titulo}</h2>
                    <h4>valor randomico 1-20: {primeirosHabitantesd20}</h4>
                    <p>{ruinas?.especificandoRuina.primeirosHabitantesd20.titulo}:&nbsp;
                        {ruinas?.especificandoRuina.primeirosHabitantesd20.eventos.map((value) => {
                            if (primeirosHabitantesd20 >= value?.rangeDado[0] && primeirosHabitantesd20 <= value?.rangeDado[1] || primeirosHabitantesd20 === value?.rangeDado[0]) {
                                return value?.conteudo
                            }
                        })}
                    </p>
                    <h4>valor randomico 1-20: {idadeRuinad20}</h4>
                    <p>{ruinas?.especificandoRuina.idadeRuinad20.titulo}:&nbsp;
                        {ruinas?.especificandoRuina.idadeRuinad20.eventos.map((value) => {
                            if (idadeRuinad20 >= value?.rangeDado[0] && idadeRuinad20 <= value?.rangeDado[1] || idadeRuinad20 === value?.rangeDado[0]) {
                                return value?.conteudo
                            }
                        })}
                    </p>
                    <h4>valor randomico 1-20: {idadeRuinaHumanad20}</h4>
                    <p>{ruinas?.especificandoRuina.idadeRuinaHumanad20.titulo}:&nbsp;
                        {ruinas?.especificandoRuina.idadeRuinaHumanad20.eventos.map((value) => {
                            if (idadeRuinaHumanad20 >= value?.rangeDado[0] && idadeRuinaHumanad20 <= value?.rangeDado[1] || idadeRuinaHumanad20 === value?.rangeDado[0]) {
                                return value?.conteudo
                            }
                        })}
                    </p>
                    <h4>valor randomico 1-20: {ocupacao1Quantod20}</h4>
                    <p>{ruinas?.especificandoRuina.ocupacao1Quantod20.titulo}:&nbsp;
                        {ruinas?.especificandoRuina.ocupacao1Quantod20.eventos.map((value) => {
                            if (ocupacao1Quantod20 >= value?.rangeDado[0] && ocupacao1Quantod20 <= value?.rangeDado[1] || ocupacao1Quantod20 === value?.rangeDado[0]) {
                                return value?.conteudo
                            }
                        })}
                    </p>
                    <h4>valor randomico 1-20: {ocupacao2Quemd20}</h4>
                    <p>{ruinas?.especificandoRuina.ocupacao2Quemd20.titulo}:&nbsp;
                        {ruinas?.especificandoRuina.ocupacao2Quemd20.eventos.map((value) => {
                            if (ocupacao2Quemd20 >= value?.rangeDado[0] && ocupacao2Quemd20 <= value?.rangeDado[1] || ocupacao2Quemd20 === value?.rangeDado[0]) {
                                if (value?.conteudo === 'Humano') {
                                    hasHumans = true
                                }
                                return value?.conteudo
                            }
                        })}
                    </p>
                    {hasHumans && (
                        <>
                            <h4>valor randomico 1-20: {especificandoHumanosd20}</h4>
                            <p>{ruinas?.especificandoRuina.especificandoHumanosd20.titulo}:&nbsp;
                                {ruinas?.especificandoRuina.especificandoHumanosd20.eventos.map((value) => {
                                    if (especificandoHumanosd20 >= value?.rangeDado[0] && especificandoHumanosd20 <= value?.rangeDado[1] || especificandoHumanosd20 === value?.rangeDado[0]) {
                                        return value?.conteudo
                                    }
                                })}
                            </p>
                        </>
                    )
                    }

                </div>
            </>
        )


    }

    function renderEvent() {
        if (currentEvent === 'DESCRIÇÃO DE HEXAGONO') {
            return renderHexagono()
        } else if (currentEvent === 'ASSENTAMENTO') {
            return renderAssentamento()
        } else if (currentEvent === 'RUINAS') {
            return renderRuinas()
        }
    }

    return (
        <div className="row m-5">
            {renderEvent()}
        </div>
    )
}

export default Home