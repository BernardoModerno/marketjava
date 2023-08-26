import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Link } from 'react-router-dom';

import MainPage from '../../components/MainPage';
import { findAllProduto } from '../../services/ProdutoService';

const ProdutoAdminListPage = () => {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const response = await findAllProduto();
                setProdutos(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        load();
    }, []);

    const nomeBodyTemplate = (row) => {
        return (
            <Link to={`/admin/produto/detail/${row.id}`}
                className="cell-link">
                {row.nome}
            </Link>
        )
    }

    return (
        <MainPage>
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Produto</h2>
                            <div>
                                <Link to="/admin/produto/create"
                                    style={{ textDecoration: "none" }}>
                                    <Button label="Cadastrar"
                                        icon="pi pi-plus" />
                                </Link>
                            </div>
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-1">
                                <DataTable value={produtos}
                                    size="small"
                                    stripedRows
                                    className="table-view">
                                    <Column field="nome"
                                        header="Nome do Produto"
                                        body={nomeBodyTemplate} />
                                    <Column field="categoria.nome" header="Categoria" />
                                    <Column field="preco" header="Preco"
                                        style={{ width: "100px" }} />
                                    <Column field="estoque" header="Estoque"
                                        style={{ width: "100px" }} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainPage>
    )

}

export default ProdutoAdminListPage;