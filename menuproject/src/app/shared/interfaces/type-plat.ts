export interface TypePlat {
    /**
     * @var id représente l'id du type de plat dans la base de donnée, valeur optionnelle dans le code
     * type : number
     */
    id?: number;

    /**
     * @var libelle: represente la valeur textuelle du type de plat
     */
    libelle: string;

    /**
     * @var icone: represente l'icone du type de plat
     */
    icone?: string;
}
