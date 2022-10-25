import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import ReactLoading from "react-loading";
import { useState } from "react";
import { useEffect } from "react";
import RecipeCard from "../components/recipeCard/RecipeCard";

const Recipes = () => {
    const [page, setPage] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecipes = async (key) => {
        const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + key;
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setRecipes(data.meals);
            })
            .catch((e) => console.log(e));
    };

    const handlePageChange = (e, key) => {
        fetchRecipes(key);
        console.log(recipes);
        setPage(Number(e.target.dataset.pagekey));
    };
    const pages = [];

    for (let i = 0; i < 26; i++) {
        const key = (i + 10).toString(36);
        pages.push(
            <Pagination.Item
                key={key}
                data-pagekey={i}
                active={i === page}
                onClick={(e) => handlePageChange(e, key)}
            >
                {key}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        fetchRecipes("a");
        console.log(recipes);
    }, []);

    const createRecipeCards = () => {
        if (loading) {
            return <ReactLoading type={"spin"} color="#000" />;
        }
        if (recipes && Boolean(recipes.length)) {
            return recipes.map((meal) => <RecipeCard meal={meal} key={meal.mealID} />);
        } else {
            return (
                <Alert key={"danger"} variant={"danger"}>
                    No recipes here!
                </Alert>
            );
        }
    };
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Pagination className="mt-5">{pages}</Pagination>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center flex-wrap">{createRecipeCards()}</Col>
            </Row>
        </Container>
    );
};

export default Recipes;
