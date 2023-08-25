import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import MainPage from '../../components/MainPage';
import {
  createCategoria,
  deleteCategoriaById,
  findAllCategoria,
  updateCategoria,
} from '../../services/CategoriaService';

const CategoriaAdminPage = () => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaDialog, setCategoriaDialog] = useState(false);
    const [deleteCategoriaDialog, setDeleteCategoriaDialog] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [insertMode, setInsertMode] = useState(false);

    const emptyCategoria = {
        id: null,
        nome: ""
    }

    const [categoria, setCategoria] = useState(emptyCategoria);

    useEffect(() => {

        load();

    }, []);

    const load = async () => {
        try {
            const response = await findAllCategoria();
            setCategorias(response.data);
        } catch (error) {
            console.error(error);
        }
    }



    const openNew = () => {
        setCategoria(emptyCategoria);
        setInsertMode(true);
        setCategoriaDialog(true);
        setSubmited(false);
    }

    const hideDialog = () => {
        setCategoriaDialog(false);
        setSubmited(false);
    }

    const hideDeleteDialog = () => {
        setDeleteCategoriaDialog(false);
    }

    const editCategoria = (categoria) => {
        setInsertMode(false);
        setSubmited(false);
        setCategoria({ ...categoria });
        setCategoriaDialog(true);
    }

    const confirmDeleteCategoria = (categoria) => {
        setCategoria(categoria);
        setDeleteCategoriaDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-plain p-mr-2"
                    onClick={() => editCategoria(rowData)}
                />

                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-text p-button-plain"
                    onClick={() => confirmDeleteCategoria(rowData)}
                />
            </React.Fragment>
        )
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const saveCategoria = async () => {
        try {
            setSubmited(true);
            if (categoria.nome.trim()) {
                if (insertMode) {
                    const response = await createCategoria(categoria);
                    const data = response.data;
                    const _categorias = [...categorias];
                    _categorias.push(data);
                    setCategorias(_categorias);
                } else {
                    const response = await updateCategoria(categoria);
                    const data = response.data;
                    const _categorias = [...categorias];
                    const index = findIndexById(data.id);
                    _categorias[index] = data;
                    setCategorias(_categorias);
                }

                setInsertMode(false);
                setCategoriaDialog(false);
                setCategoria(emptyCategoria);
                setSubmited(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteCategoria = async () => {
        try {
            await deleteCategoriaById(categoria.id);
            let _categorias = categorias.filter(val => val.id !== categoria.id);
            setCategorias(_categorias);
            setDeleteCategoriaDialog(false);
            setCategoria(emptyCategoria);

        } catch (error) {
            console.error(error);
        }
    }

    const categoriaDialogFooter = (
        <React.Fragment>
            <Button label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button label="Salvar categoria"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveCategoria}
            />
        </React.Fragment>
    );

    const deleteCategoriaDialogFooter = (
        <React.Fragment>
            <Button label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialog}
            />
            <Button label="Deletar"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteCategoria}
            />
        </React.Fragment>
    )

    return (
        <MainPage>
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Categoria</h2>
                            <div className="p-d-inline">
                                <Button
                                    label="Cadastrar"
                                    icon="pi pi-plus"
                                    className="p-mr-2"
                                    onClick={openNew}
                                />
                            </div>
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-1">
                                <DataTable
                                    value={categorias}
                                    size="small"
                                    className="table-view"
                                    stripedRows>
                                    <Column field="nome" header="Nome da Categoria"></Column>
                                    <Column body={actionBodyTemplate}
                                        style={{ width: "120px", textAlign: "right" }}
                                    ></Column>
                                </DataTable>
                            </div>
                        </div>

                        <Dialog visible={categoriaDialog}
                            style={{ width: "500px" }}
                            header="Categoria"
                            modal
                            className="p-fluid"
                            onHide={hideDialog}
                            footer={categoriaDialogFooter}>
                            <div className="p-field">
                                <label htmlFor="nome">Nome</label>
                                <InputText id="nome"
                                    value={categoria.nome}
                                    onChange={(e) => {
                                        const val = (e.target && e.target.value) || '';
                                        const _categoria = { ...categoria };
                                        _categoria.nome = val;
                                        setCategoria(_categoria);
                                    }}
                                />
                                {submited && !categoria.nome && <small className="p-error">O nome é obrigatório.</small>}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteCategoriaDialog}
                            style={{ width: "500px" }}
                            header="Confirmação"
                            modal
                            footer={deleteCategoriaDialogFooter}
                            onHide={hideDeleteDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3"
                                    style={{ fontSize: "2rem" }}
                                ></i>
                                {categoria && <span>Tem certeza de que deseja excluir a categoria? <b>{categoria.nome}</b>?</span>}
                            </div>
                        </Dialog>
                    </div>

                </div>
            </div>
        </MainPage>
    )

}

export default CategoriaAdminPage;