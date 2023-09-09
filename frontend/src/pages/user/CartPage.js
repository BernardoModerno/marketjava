import {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { useCart } from '../../auth/cart';
import { useAuth } from '../../auth/useAuth';
import Layout from '../../components/Layout/Layout';
import { APP_BASE_URL } from '../../configs/constants';
import api from '../../services/api';
import { findUsuarioById } from '../../services/UsuarioService';

const CartPage = () => {
  const { user } = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const emptyUsuario = {
    id: null,
    nome: "",
    endereco: "",
    email: "",
  };

  const [usuario, setUsuario] = useState(emptyUsuario);

  const loadUsuario = async () => {
    try {
      const response = await findUsuarioById(user?.username);
      setUsuario(response?.data);
      console.log("Dados do usuario: " + response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsuario();
    // eslint-disable-next-line
  }, []);

  //total preco
  const totalPreco = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.preco;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // const comprarCartItem = async (pid) => {
  //   try {
  //     const { data } = await api.post("/api/ordem", {
  //       envio: 22,
  //       enderecoEnvio: usuario.endereco,
  //       items: [
  //         {
  //           produtoId: cart?.id,
  //           quantidade: 1,
  //         },
  //       ],
  //     });
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     console.log(" Cart é : ...." + data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const comprarCartItem = async (pid) => {
    try {
      const { data } = await api.post("/api/carrinho", {
        produtoId: cart[0]?.id,
        quantidade: 1,
      });
      localStorage.removeItem("cart");
      setCart([]);
      console.log(" Cart é : ...." + data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Olá ${user?.token && user?.nome}`}
            </h1>
            <h4 className="text-center">
              <button
                className="btn btn-outline-info mt-2 mr-3"
                onClick={() => navigate("/user/dashboard")}
              >
                Voltar para Tela Inicial
              </button>
              {cart?.length
                ? `Você tem ${cart.length} items no seu carrinho ${
                    user?.token ? "" : "Por favor, faça login para checkout"
                  }`
                : " Seu carrinho está vazio"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h1>{`Olá ${usuario?.nome}`}</h1>
            {cart?.map((p) => (
              <div className="row mb-2 p-1 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${APP_BASE_URL}/api/images/${p?.foto}`}
                    className="card-img-top"
                    alt={p.nome}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.nome}</p>
                  <p>{p.descricao}</p>
                  <p>Preco : {p.preco}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            <button
              className="btn btn-info ml-2"
              onClick={() => comprarCartItem()}
            >
              Adicionar ao carrinho
            </button>
          </div>
          <div className="col-md-4 text-center">
            <h2>Dados dos items</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPreco()} </h4>
            {usuario?.endereco ? (
              <>
                <div className="mb-3">
                  <h4>Endereço cadastrado.</h4>
                  <h5>{usuario?.endereco}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/user/profile")}
                  >
                    Update endereco
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <h4>Sem endereço...</h4>
                {user?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/user/profile")}
                  >
                    Update endereco
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/signin", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
