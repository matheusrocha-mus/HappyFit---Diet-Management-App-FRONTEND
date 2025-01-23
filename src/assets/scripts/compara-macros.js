const compareGoals = (goalMacros, dietMacros) => {
    const calories = numberWithSign(
        (dietMacros.totalCalories - goalMacros.caloriesGoal).toFixed(2)
    );
    const proteins = numberWithSign(
        (dietMacros.totalProteins - goalMacros.proteinsGoal).toFixed(2)
    );
    const carbs = numberWithSign(
        (dietMacros.totalCarbs - goalMacros.carbsGoal).toFixed(2)
    );
    const fats = numberWithSign(
        (dietMacros.totalFats - goalMacros.fatsGoal).toFixed(2)
    );
    //console.log(goalMacros);
    //console.log(dietMacros);
    return { calories, proteins, carbs, fats };
};

const numberWithSign = (n) => {
    return n > 0 ? "+" + n : n;
};

const getCaloriesDifferenceColor = (calories) => {
    if (profile.currentGoal == "MANUTENCAO") {
        if (calories == 0) return "#198754";
        return "#dc3545";
    }

    if (profile.currentGoal == "HIPERTROFIA") {
        if (calories < 0) return "#dc3545";
        return "#198754";
    }

    if (profile.currentGoal == "EMAGRECIMENTO") {
        if (calories > 0) return "#dc3545";
        return "#198754";
    }
};

const getProteinsDifferenceColor = (proteins) => {
    if (profile.currentGoal == "HIPERTROFIA") {
        if (proteins < 0) return "#dc3545";
        return "#198754";
    }

    return "#ffc107";
};