import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import MainPage from '../../components/MainPage';
import { findAllCategoria } from '../../services/CategoriaService';
import {
  findProdutoById,
  updateProduto,
} from '../../services/ProdutoService';

const ProdutoAdminEditPage = () => {

    const [produto, setProduto] = useState();
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submited, setSubmited] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const loadCategoria = async () => {
            try {
                const response = await findAllCategoria();
                setCategorias(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadCategoria();

        const loadProduto = async () => {
            try {
                const response = await findProdutoById(id);
                const _produto = response.data;
                setProduto(_produto);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        loadProduto();
    }, [id]);

    const saveProduto = async () => {
        try {
            setSubmited(true);
            const response = await updateProduto(produto);
            const _produto = response.data;
            navigate(`/admin/produto/detail/${_produto.id}`, {
                replace: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <MainPage>
            {loading ?
                <ProgressBar mode="indeterminate"
                    className="my-progress-bar" /> :
                <div className="main-content">
                    <div className="content">
                        <div className="content-inner">
                            <div className="content-header">
                                <h2>Adicionar produto</h2>
                            </div>
                            <div className="content-body">
                                <div className="content-form shadow-1">
                                    <div className="p-fluid mb-4">

                                        <div className="p-filed mb-3">
                                            <label htmlFor="nome" className="form-label">Nome</label>
                                            <InputText value={produto.nome}
                                                placeholder="Digite o número do produto"
                                                id="nome"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produto = { ...produto };
                                                    _produto.nome = val;
                                                    setProduto(_produto);
                                                }}
                                            />
                                            {submited && !produto.nome && <span className="p-error">o número do produto não pode ficar vazio</span>}
                                        </div>

                                        <div className="p-field mb-3">
                                            <label htmlFor="categoria" className="form-label">Categoria</label>
                                            <Dropdown optionLabel="nome"
                                                optionValue="id"
                                                id="categoria"
                                                value={produto.categoria.id}
                                                options={categorias}
                                                placeholder="Selecione uma categoria"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || null;
                                                    const _produto = { ...produto };
                                                    _produto.categoria.id = val;
                                                    setProduto(_produto);
                                                }}
                                            />
                                            {submited && !produto.categoria.id && <span className="p-error">A categoria do produto deve ser selecionada</span>}
                                        </div>

                                        <div className="p-filed mb-3">
                                            <label htmlFor="deskripsi" className="form-label">Descrição</label>
                                            <InputText value={produto.descricao}
                                                placeholder="Digite uma descrição do produto"
                                                id="descricao"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produto = { ...produto };
                                                    _produto.descricao = val;
                                                    setProduto(_produto);
                                                }}
                                            />
                                        </div>

                                        <div className="p-filed mb-3">
                                            <label htmlFor="preco" className="form-label">Preço</label>
                                            <InputText value={produto.preco}
                                                placeholder="Digite o preço do produto"
                                                id="preco"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produto = { ...produto };
                                                    _produto.preco = val;
                                                    setProduto(_produto);
                                                }}
                                            />
                                            {submited && !produto.preco && <span className="p-error">preco produto não pode ficar vazio</span>}
                                        </div>

                                        <div className="p-filed mb-3">
                                            <label htmlFor="estoque" className="form-label">Estoque</label>
                                            <InputText value={produto.estoque}
                                                placeholder="Preencha estoque produto"
                                                id="estoque"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produto = { ...produto };
                                                    _produto.estoque = val;
                                                    setProduto(_produto);
                                                }}
                                            />
                                            {submited && !produto.estoque && <span className="p-error">O estoque de produtos não pode estar vazio</span>}
                                        </div>

                                    </div>

                                    <div>
                                        <Button label="Salvar"
                                            icon="pi pi-check"
                                            onClick={saveProduto}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </MainPage>
    )
}

export default ProdutoAdminEditPage;