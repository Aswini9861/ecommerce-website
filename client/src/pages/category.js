import Layout from "../components/layout/Layout";
import { UseCategory } from "./hooks/useCategory";
import { Link } from "react-router-dom";
const Category = () => {
  const categories = UseCategory();

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className=" col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
            <Link to={`/category/${c.slug}`}>
            <button className="btn btn-primary">{c.name}</button>

            </Link>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
