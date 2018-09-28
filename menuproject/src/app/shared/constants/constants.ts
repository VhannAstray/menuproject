export class Constants {
    /**
     * Constante de l'URI qui gère les recettes.
     *
     * GET : Renvoi la liste des recettes sous la forme d'un tableau JSON
     *      - Si on lui transmet l'id en paramètre dans l'URI
     *      example : http://192.168.2.115:3000/recettes/2
     *      renvoi un tableau Json de la recette numéro 2 en id.
     *
     * POST : Ajoute la recette fourni en paramètre JSON
     * {
            "titre": "Plat à supprimer",
            "instructions": "Demerdez vous!",
            "tempsPreparation": 15,
            "tempsCuisson": 10,
            "nombrePersonnes": 1,
            "typeMeal": 1
        }
        Remarque : L'utilisateur est toujours à 0 dans le backend,
         on prévoit qu'un utilisateur pour le moment.

        PUT : Met à jour juste le titre de la recette, à modifier en fonction du besoin coté BACKEND
        Exemple : http://192.168.2.115:3000/recettes/2
        {
            "titre": "Pâte à l'eau pirouette"
        }

        DELETE : Supprime la recette de la base de donnée en passant l'id en 
        paramètre.
        Exemple : http://192.168.2.115:3000/recettes/5
        "Supprime la recette n°5"

     */
    public static get _API_ROOT(): string {
        return 'http://192.168.2.115:3000/recettes/';
    }

     /**
     * Constante de l'URI qui renvoi la liste des recettes un jour donné.
     * Il faut un paramètre genre : http://192.168.2.115:3000/recettes/date/2018-09-26
     */
    public static get _API_ROOT_DATE(): string {
        return 'http://192.168.2.115:3000/recettes/date/';
    }

    /**
     * Constante de l'URI qui renvoi la liste des recettes d'un planning donné (1 planning = 1 jour).   
     * Il faut un paramètre genre : http://127.0.0.1:3000/recettes/idPlanning/3
     */
    public static get _API_ROOT_PLANNING(): string {
        return 'http://192.168.2.115:3000/recettes/idPlanning/';
    }

    /**
     * Constante de l'URI qui renvoi la liste des types de plats.
     * Renvoi tous les plats sans paramètre et 1 type de plat lorsqu'un id est transmis.
     */
    public static get _API_TYPES_PLATS(): string {
        return 'http://192.168.2.115:3000/typesPlats/';
    }

     /**
     * Constante de l'URI qui permet d'ajouter une recette sur un planning
     * Il faut un paramètre JSON en mode POST:
     *   {
     *       "planning_id": 1, // Le planning correspondant à la journée
     *       "recettes_id": 6, // La recette en question
     *       "is_midi": 1  // si c'est une recette du midi ou du soir, 1 pour midi, 0 pour le soir
     *   }
     *
     * En mode DELETE, il supprime la recette du planning transmis en tableau JSON
     *
     * Il faut obligatoirement fournir les 3 paramètres sinon risque de delete des recettes du planning de manière indésirable.
     */
    public static get _API_MENU_PLANNING(): string {
        return 'http://192.168.2.115:3000/menuPlanning/';
    }

}
