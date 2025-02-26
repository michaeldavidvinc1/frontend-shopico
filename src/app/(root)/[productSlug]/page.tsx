import HeaderPage from "../components/header";
import CardDetailProduct from "./components/card-detail";

const DetailProduct = async({ params }: { params: { productSlug: string } }) => {
    const { productSlug } = await params;
    return (
        <div>
            <HeaderPage  />
            <CardDetailProduct slug={productSlug} />
        </div>
    )
}

export default DetailProduct
