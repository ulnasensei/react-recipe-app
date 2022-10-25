import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ meal }) => {
    const navigate = useNavigate();
    const handleBtnClick = (e) => {
        navigate(`/recipe/${e.target.dataset.recipe}`);
    };
    return (
        <Card style={{ width: "18rem" }} className="m-3">
            <Card.Img variant="top" src={meal.strMealThumb} />
            <Card.Body className="text-center">
                <Card.Title className="text-truncate">{meal.strMeal}</Card.Title>
                <Card.Text className="text-truncate">{meal.strInstructions}</Card.Text>
                <Button variant="primary" data-recipe={meal.idMeal} onClick={handleBtnClick}>
                    Go to recipe
                </Button>
            </Card.Body>
        </Card>
    );
};

export default RecipeCard;
