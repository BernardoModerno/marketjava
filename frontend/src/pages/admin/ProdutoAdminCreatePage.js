import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { useNavigate } from 'react-router-dom';

import MainPage from '../../components/MainPage';
import { APP_BASE_URL } from '../../configs/constants';
import { findAllCategoria } from '../../services/CategoriaService';
import { createProduto } from '../../services/ProdutoService';

const ProdutoAdminCreatePage = () => {

    const [produto, setProduto] = useState();
    const [categoria, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submited, setSubmited] = useState(false);

    const navigate = useNavigate();

    const [img, setImg] = useState();

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

        const emptyProduto = {
            id: null,
            nome: "",
            foto: "",
            categoria: {
                id: null
            },
            descricao: "",
            estoque: 0,
            preco: 0
        }

        setProduto(emptyProduto);
        setLoading(false);

    }, []);

    const saveProduto = async () => {
        try {
            setSubmited(true);
            const response = await createProduto(produto);
            const _produto = response.data;
            navigate(`/admin/produto/detail/${_produto.id}`, {
                replace: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onUpload = async (event) => {
        const [file] = event.files;
        const imageObjectURL = URL.createObjectURL(file);
        setImg(imageObjectURL);
        const response = JSON.parse(event.xhr.response);
        const _produto = produto;
        _produto.foto = response.fileName;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const onBeforeSend = async (event) => {
        if (user && user.token) {
            event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
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
                                <h2>Mais Produtos</h2>
                            </div>
                            <div className="content-body">
                                <div className="content-form shadow-1">

                                    <div className="flex">
                                        <div className="flex-grow-1">
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
                                                        options={categoria}
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
                                                    <label htmlFor="descricao" className="form-label">Descrição</label>
                                                    <InputText value={produto.descricao}
                                                        placeholder="Tipo descrição do produto"
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
                                                        placeholder="Digite preço do produto"
                                                        id="preco"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || '';
                                                            const _produto = { ...produto };
                                                            _produto.preco = val;
                                                            setProduto(_produto);
                                                        }}
                                                    />
                                                    {submited && !produto.preco && <span className="p-error">preço do produto não pode ficar vazio</span>}
                                                </div>

                                                <div className="p-filed mb-3">
                                                    <label htmlFor="estoque" className="form-label">Estoque</label>
                                                    <InputText value={produto.estoque}
                                                        placeholder="Informe estoque produto"
                                                        id="estoque"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || '';
                                                            const _produto = { ...produto };
                                                            _produto.estoque = val;
                                                            setProduto(_produto);
                                                        }}
                                                    />
                                                    {submited && !produto.estoque && <span className="p-error">o estoque do produto não pode ficar vazio</span>}
                                                </div>

                                            </div>

                                            <div>
                                                <Button label="Salvar"
                                                    icon="pi pi-check"
                                                    onClick={saveProduto}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-none ml-6 mt-4"
                                            style={{ textAlign: "center" }}>
                                            <div className="image-display-wrapper">
                                                {
                                                    img ?
                                                        <img src={img}
                                                            alt="foto Produto"
                                                            className="image-display" /> :
                                                        <i className="icon-display pi pi-image"></i>
                                                }
                                            </div>
                                            <FileUpload
                                                name="file"
                                                url={`${APP_BASE_URL}/api/uploadImage`}
                                                auto
                                                accept="image/*"
                                                onUpload={onUpload}
                                                onBeforeSend={onBeforeSend}
                                                chooseLabel="Pilih foto"
                                                mode="basic" />
                                        </div>
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

export default ProdutoAdminCreatePage;