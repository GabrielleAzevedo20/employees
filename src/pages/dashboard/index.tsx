/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import Repository from '../repository';
import { Title, Form, Repositories, Error } from './styles';
import Formulario from '../formulario/Formulario';

interface Funcionarios {
    id: number;
    name: string;
    funcao: string;
    images: [
        {
            url: string;
        },
    ];
}

const Dashboard: React.FC = () => {
    const [newRepository, setNewRepository] = useState('');
    const [inputError, setInputError] = useState('');

    const [repositories, setRepositories] = useState<Funcionarios[]>([]);

    async function handleAddRepository(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();

        if (!newRepository) {
            setInputError('Digite um funcionário');
            return;
        }

        try {
            const response = await api.get<Funcionarios>(
                `/funcionarios/${newRepository}`,
            );
            const funcionario = response.data;
            setRepositories([...repositories, funcionario]);
            setNewRepository('');
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca deste funcionário');
        }
    }

    return (
        <>
            <Title>Cadastro de Funcionarios</Title>

            <Link to="/formulario">
                <FiChevronRight size={16} />
                Cadastro
            </Link>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepository}
                    onChange={e => setNewRepository(e.target.value)}
                    placeholder="Digite o ID de um funcionário"
                />
                <button type="submit"> Pesquisar </button>
            </Form>
            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(funcionario => (
                    <Link
                        key={funcionario.id}
                        to={`/funcionarios/${funcionario.id}`}
                    >
                        <img
                            src={funcionario?.images[0].url}
                            alt={funcionario?.name}
                        />
                        <div>
                            <strong>{funcionario.name}</strong>
                            <p>{funcionario.funcao}</p>
                        </div>
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
