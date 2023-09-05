import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../auth/useAuth';
import {
  findUsuarioById,
  updateProfile,
} from '../../services/UsuarioService';

const ProfileUserPage = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const { user } = useAuth();
  const emptyUsuario = {
    id: null,
    nome: "",
    endereco: "",
    email: "",
  };

  const [usuario, setUsuario] = useState(emptyUsuario);

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const load = async () => {
    try {
      const response = await findUsuarioById(user?.username);
      setUsuario(response?.data);
      console.log("Dados do usuario: " + response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProfile = async () => {
    try {
      const response = await updateProfile(usuario);
      const data = response?.data;
      setUsuario(data);
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Perfil atualizado com sucesso",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/user/cart")}
              >
                Voltar para Carrinho
              </button>
              <h2>Profile</h2>
            </div>
            <div className="content-body">
              <div className="content-form shadow-1">
                <div className="p-fluid">
                  <div className="p-field">
                    <label htmlFor="nome">Nome</label>
                    <InputText
                      id="nome"
                      required={true}
                      value={usuario?.nome}
                      onChange={(e) => {
                        const val = (e?.target && e?.target.value) || "";
                        const _usuario = { ...usuario };
                        _usuario.nome = val;
                        setUsuario(_usuario);
                      }}
                    />
                    {!usuario.nome && (
                      <small className="p-error">o nome é obrigatório</small>
                    )}
                  </div>

                  <div className="p-field">
                    <label htmlFor="endereco">Endereço</label>
                    <InputText
                      id="endereco"
                      required={true}
                      value={usuario?.endereco}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _usuario = { ...usuario };
                        _usuario.endereco = val;
                        setUsuario(_usuario);
                      }}
                    />
                    {!usuario.endereco && (
                      <small className="p-error">endereço é obrigatório</small>
                    )}
                  </div>

                  <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText
                      id="email"
                      required={true}
                      value={usuario?.email}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _usuario = { ...usuario };
                        _usuario.email = val;
                        setUsuario(_usuario);
                      }}
                    />
                    {!usuario.email && (
                      <small className="p-error">Email é obrigatório</small>
                    )}
                  </div>

                  <div className="p-field">
                    <label htmlFor="telefone">Telefone</label>
                    <InputText
                      id="telefone"
                      required={true}
                      value={usuario?.telefone}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _usuario = { ...usuario };
                        _usuario.telefone = val;
                        setUsuario(_usuario);
                      }}
                    />
                    {!usuario.telefone && (
                      <small className="p-error">Telefone é obrigatório</small>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    onClick={saveProfile}
                    disabled={
                      !usuario.nome ||
                      !usuario.endereco ||
                      !usuario.email ||
                      !usuario.telefone
                    }
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserPage;