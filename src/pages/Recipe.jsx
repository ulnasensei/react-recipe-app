import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import ReactLoading from "react-loading";

const Recipe = () => {
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(false);
    const recipeID = useLocation().pathname.split("/")[2];

    const fetchRecipes = useCallback(() => {
        const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeID;
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setRecipe(data.meals);
            })
            .catch((e) => console.log(e));
    }, []);
    useEffect(() => {
        fetchRecipes();
    }, []);

    console.log(recipeID);

    const ingredients = [];

    const createRecipe = () => {
        if (loading) {
            return (
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <ReactLoading type={"spin"} color="#000" />
                </div>
            );
        }
        if (recipe && Boolean(recipe.length)) {
            for (let i = 1; i <= 20; i++) {
                if (
                    recipe[0][`strIngredient${i}`] &&
                    Boolean(recipe[0][`strIngredient${i}`].length)
                ) {
                    ingredients.push([recipe[0][`strIngredient${i}`], recipe[0][`strMeasure${i}`]]);
                }
            }
            console.log(ingredients);
            return (
                <Container className="h-100 mt-5">
                    <Row className="d-flex justify-content-center align-items-center flex-wrap">
                        <Col>
                            <Image
                                src={recipe[0].strMealThumb}
                                alt="recipe-image"
                                height={"450px"}
                            />
                        </Col>
                        <Col>
                            <h1 className="mb-5">{recipe[0].strMeal}</h1>
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <th>Category</th>
                                        <td>{recipe[0].strCategory}</td>
                                    </tr>
                                    <tr>
                                        <th>Region</th>
                                        <td>{recipe[0].strArea}</td>
                                    </tr>
                                    <tr>
                                        <th>Tags</th>
                                        <td>{recipe[0].strTags}</td>
                                    </tr>
                                    <tr>
                                        <th>Video Recipe</th>
                                        <td>
                                            <a href={recipe[0].strYoutube} target="_blank">
                                                Watch on Youtube
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="m-5">
                        <Col className="d-flex justify-content-center">
                            <Table striped={"columns"} hover className="w-50 text-center">
                                <thead>
                                    <tr>
                                        <th>Ingredient</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredients.map((item) => {
                                        return (
                                            <React.Fragment key={item}>
                                                <tr>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <p className="text-justify w-75 m-auto">{recipe[0].strInstructions}</p>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Alert key={"danger"} variant={"danger"}>
                    I lost the recipe!
                </Alert>
            );
        }
    };
    return <>{createRecipe()}</>;
};

export default Recipe;
