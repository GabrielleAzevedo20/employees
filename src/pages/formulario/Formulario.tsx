/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Title, Form } from './styles';

const Cadastro: React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [funcao, setFuncao] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [curtidas, setCurtidas] = useState(0);
    const [images, setImages] = useState<File[]>([]);

    function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        const selectedImage = Array.from(event.target.files);
        setImages(selectedImage);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setCurtidas(0);

        const data = new FormData();

        data.append('name', name);
        data.append('funcao', funcao);
        data.append('departamento', departamento);
        data.append('email', email);
        data.append('telefone', telefone);
        data.append('curtidas', String(curtidas));

        images.forEach(image => {
            data.append('images', image);
        });

        await api.post('/funcionarios', data);

        history.push('/');
    }

    return (
        <>
            <Title>Cadastro de Funcionários</Title>

            <Form>
                <main>
                    <form
                        onSubmit={handleSubmit}
                        className="create-funcionario-form"
                    >
                        <fieldset>
                            <legend>Dados</legend>
                            <div className="input-block">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={event =>
                                        setName(event.target.value)
                                    }
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="funcao">Função</label>
                                <input
                                    type="text"
                                    id="funcao"
                                    value={funcao}
                                    onChange={event =>
                                        setFuncao(event.target.value)
                                    }
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="departamento">
                                    Departamento
                                </label>
                                <input
                                    type="text"
                                    id="departamento"
                                    value={departamento}
                                    onChange={event =>
                                        setDepartamento(event.target.value)
                                    }
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="telefone">Telefone</label>
                                <input
                                    type="text"
                                    id="telefone"
                                    value={telefone}
                                    onChange={event =>
                                        setTelefone(event.target.value)
                                    }
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="images[]">Image</label>
                                <input
                                    onChange={handleSelectedImages}
                                    type="file"
                                    id="images[]"
                                />
                                <div className="images" />
                            </div>
                        </fieldset>
                        <button type="submit">Confirmar</button>
                    </form>
                </main>
            </Form>
        </>
    );
};

export default Cadastro;
