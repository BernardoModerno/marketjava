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

    useEffect(() => {
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