/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { FiChevronsLeft } from 'react-icons/fi';
import Lottie from 'react-lottie';
import api from '../../services/api';
import { Header, RepositoryFunc, ButtonWrapper } from './styles';
import animationData from '../../assets/animation.json';

interface FuncParams {
    id: string;
}

interface FuncRepo {
    name: string;
    funcao: string;
    departamento: string;
    email: string;
    telefone: string;
    images: [
        {
            url: string;
        },
    ];
}

const Repository: React.FC = () => {
    const history = useHistory();
    const [funcionario, setFuncionario] = useState<FuncRepo | null>(null);
    const { params } = useRouteMatch<FuncParams>();
    const [isLiked, setLikeState] = useState(false);
    const [animationState, setAnimationState] = useState({
        isStopped: true,
        isPaused: false,
        direction: -1,
    });
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    async function deleteFunc() {
        await api.delete(`/funcionarios/${params.id}`);

        history.push('/');
    }
    useEffect(() => {
        api.get(`funcionarios/${params.id}`).then(response => {
            setFuncionario(response.data);
        });
    }, [params.id]);

    return (
        <>
            <Header>
                <Link to="/">
                    <FiChevronsLeft size={16} />
                    Voltar
                </Link>
            </Header>

            <RepositoryFunc>
                <header>
                    <img
                        src={funcionario?.images[0].url}
                        alt={funcionario?.name}
                    />

                    <div>
                        <strong>Funcionário</strong>
                        <p>Descrição do Funcionário</p>
                    </div>
                </header>

                <ul>
                    <li>
                        <h1>Nome do Funcionário</h1>
                        <span>{funcionario?.name}</span>
                    </li>
                    <li>
                        <h1>Função do Funcionário</h1>
                        <span>{funcionario?.funcao}</span>
                    </li>
                    <li>
                        <h1>Departamento do Funcionário</h1>
                        <span>{funcionario?.departamento}</span>
                    </li>
                    <li>
                        <h1>Email do Funcionário</h1>
                        <span>{funcionario?.email}</span>
                    </li>
                    <li>
                        <h1>Telefone do Funcionário</h1>
                        <span>{funcionario?.telefone}</span>
                    </li>
                </ul>
            </RepositoryFunc>

            <ButtonWrapper
                onClick={() => {
                    const reverseAnimation = -1;
                    const normalAnimation = 1;

                    setAnimationState({
                        ...animationState,
                        isStopped: false,
                        direction:
                            animationState.direction === normalAnimation
                                ? reverseAnimation
                                : normalAnimation,
                    });
                    setLikeState(!isLiked);
                }}
            >
                <div className="animation">
                    <Lottie
                        options={defaultOptions}
                        width={400}
                        height={400}
                        direction={animationState.direction}
                        isStopped={animationState.isStopped}
                        isPaused={animationState.isPaused}
                    />
                </div>
            </ButtonWrapper>
            <span>{isLiked ? 1 : 0}</span>
            <br />
            <br />
            <button type="button" onClick={deleteFunc}>
                Excluir funcionario
            </button>
        </>
    );
};

export default Repository;
