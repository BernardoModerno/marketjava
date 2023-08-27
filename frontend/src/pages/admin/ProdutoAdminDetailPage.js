import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ProgressBar } from 'primereact/progressbar';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import MainPage from '../../components/MainPage';
import { APP_BASE_URL } from '../../configs/constants';
import {
  deleteProdutoById,
  findProdutoById,
} from '../../services/ProdutoService';

const ProdutoAdminDetailPage = () => {

    const [produto, setProduto] = useState();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [delDialog, setDelDialog] = useState(false);
    const navigate = useNavigate();

    const [img, setImg] = useState();

    useEffect(() => {
        const loadProduto = async () => {
            try {
                const response = await findProdutoById(id);
                const _produto = response.data;
                setProduto(_produto);
                if (_produto.foto) {
                    fetchImage(_produto.foto);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        loadProduto();
    }, [id]);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchImage = async (foto) => {
        const res = await fetch(`${APP_BASE_URL}/api/images/${foto}`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    }

    const handleDelete = async () => {
        try {
            await deleteProdutoById(id);
            navigate("/admin/produto", {
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
                                <h2>Detalhe do Produto {produto.nome}</h2>
                                <div>
                                    <Link to="/admin/produto"
                                        style={{ textDecoration: "none" }}>
                                        <Button label="Retornar"
                                            icon="pi pi-chevron-left"
                                            className="mr-2" />
                                    </Link>

                                    <Link to={`/admin/produto/edit/${produto.id}`}
                                        style={{ textDecoration: "none" }}>
                                        <Button label="Edit"
                                            icon="pi pi-pencil"
                                            className="mr-4" />
                                    </Link>

                                    <Button icon="pi pi-trash"
                                        label="Deletar"
                                        className="p-button-danger"
                                        onClick={() => setDelDialog(true)}
                                    />
                                </div>
                            </div>
                            <div className="content-body">
                                <div className="content-detail shadow-1">
                                <div className="flex">
                                        <div className="flex-grow-1">
                                            <div className="grid">
                                                <div className="col-fixed detail-label">Nome do Produto</div>
                                                <div className="col">{produto.nome}</div>
                                            </div>
                                            <div className="grid">
                                                <div className="col-fixed detail-label">Categoria</div>
                                                <div className="col">{produto.categoria.nome}</div>
                                            </div>
                                            <div className="grid">
                                                <div className="col-fixed detail-label">Descrição</div>
                                                <div className="col">{produto.descricao}</div>
                                            </div>
                                            <div className="grid">
                                                <div className="col-fixed detail-label">Preço</div>
                                                <div className="col">{produto.preco}</div>
                                            </div>
                                            <div className="grid">
                                                <div className="col-fixed detail-label">Estoque</div>
                                                <div className="col">{produto.estoque}</div>
                                            </div>
                                        </div>
                                        <div className="flex-none">
                                            <div className="image-display-wrapper">
                                                {
                                                    img ?
                                                        <img src={img}
                                                            alt="Foto do produto"
                                                            className="image-display" /> :
                                                        <i className="icon-display pi pi-image"></i>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ConfirmDialog visible={delDialog}
                                onHide={() => setDelDialog(false)}
                                message="Tem certeza de que deseja excluir esses dados?"
                                header="Confirmar"
                                icon="pi pi-exclamation-triangle"
                                accept={handleDelete}
                            />
                        </div>
                    </div>
                </div>
            }
        </MainPage>
    )
}

export default ProdutoAdminDetailPage;