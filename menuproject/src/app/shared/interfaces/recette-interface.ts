export interface RecetteInterface {
    /**
     * @var id représente l'id dans la base de donnée, valeur optionnelle dans le code
     * type : number
     */
    id?: number;

    /**
     * @var titre représente le titre de la recette
     * type : string
     */
    titre: string;

    /**
     * @var instructions : représente les instructions de la recette
     * type : string
     */
    instructions: string;

    /**
     * @var tempsPreparation: représente le temps de préparation de la recette
     * type: number
     */
    tempsPreparation: number;

    /**
     * @var tempsCuisson: représente le temps de cuisson de la recette
     * type: number
     */
    tempsCuisson: number;

    /**
     * @var nombrePersonnes: représente le nombre de personne de la recette
     * type: number
     */
    nombrePersonnes: number;

    /**
     * @var typeMeal: représente le type de meal, entrée, plat ou dessert
     * type : number
     */
    typeMeal: number;

    /**
     * @var number : Variable pour déterminer si la recette est du déjeuner ou du soir
     */
    isMidi?: number;

    /**
     * @var String : Variable de l'url de la photo
     */
    photos: string;
}
