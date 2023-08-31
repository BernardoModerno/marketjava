import {
  useEffect,
  useState,
} from 'react';

import { Checkbox } from 'primereact/checkbox';

import Header from '../../components/Header';
import { APP_BASE_URL } from '../../configs/constants';
import { findAllCategoria } from '../../services/CategoriaService';
import { findAllProduto } from '../../services/ProdutoService';

const DashboardUserPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [produtos, setProdutos] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    const loadCategoria = async () => {
      try {
        const response = await findAllCategoria();
        setCategorias(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategoria();
    getAllProdutos()

    console.log(
      "Categoria selecionada: " + categorias[selectedCategorias[0]]?.id
    );
    console.log("Categoria selecionada: " + [...selectedCategorias]?.id);
  }, [selectedCategorias]);

  const getAllProdutos = async () => {
    try {
        const response = await findAllProduto();
        setProdutos(response.data);
    } catch (error) {
        console.error(error);
    }
}



  //get filterd product
  // const filterProduct = async () => {
  //   try {
  //     const response = await findAllProdutosPorCategoria(categoriaId);
  //     setProdutos(response?.data);
  //     console.log("Categoria de Produtos esta chegando???" + response?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const user = JSON.parse(localStorage.getItem("user"));
  // const fetchImage = async (foto) => {
  //   const res = await fetch(`${APP_BASE_URL}/api/images/${foto}`, {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });

  //   const imageBlob = await res.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);
  //   setImg(imageObjectURL);
  // };

  const onCategoriaChange = (e) => {
    let _selectedCategorias = [...selectedCategorias];

    if (e.checked) _selectedCategorias.push(e.value);
    else
      _selectedCategorias = _selectedCategorias.filter(
        (categoria) => categoria?.id !== e.value.id
      );

    setSelectedCategorias(_selectedCategorias);
    setCategoriaId(e?.value?.id);
    console.log("Categoria de Produtos esta chegando???" + selectedCategorias);
    console.log("Categoria selecionada: " + selectedCategorias?.id);
    console.log("POSICAO DA CATEGORIA SELECIONADA ", e.value);
    console.log("Id da POSICAO DA CATEGORIA SELECIONADA " + e?.value?.id);
    console.log(
      "Id da POSICAO DA CATEGORIA SELECIONADA UseState " + categoriaId
    );
    console.log("Categoria selecionada ", categorias[e.value]);
  };

  return (
    <>
      <Header />
      <div className="sidebar">
        <h3>Categorias de Produtos</h3>
        <div className="card flex justify-content-center">
          <div className="flex flex-column gap-3">
            {categorias?.map((categoria) => {
              return (
                <div key={categoria?.id} className="flex align-items-center">
                  <Checkbox
                    inputId={categoria?.id}
                    name="categoria"
                    value={categoria}
                    onChange={onCategoriaChange}
                    checked={selectedCategorias.some(
                      (item) => item?.id === categoria?.id
                    )}
                  />
                  <label htmlFor={categoria?.id} className="ml-2">
                    {categoria?.nome}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="content">
            <div className="d-flex flex-wrap">
              {produtos?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p?.id}
                >
                  <img
                    src={`${APP_BASE_URL}/api/images/${p?.foto}`}
                    className="card-img-top"
                    alt={p?.nome}
                    width="250" height="250"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p?.nome}</h5>
                    <p className="card-text">
                      {p?.descricao}...
                    </p>
                    <p className="card-text"> $ {p?.preco}</p>
                    {/* <button
                      className="btn btn-primary ms-1"
                      onClick={() => Navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button> */}
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
              {produtos && produtos.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div> */}
          </div>
        </div>
    </>
  );
};

export default DashboardUserPage;
