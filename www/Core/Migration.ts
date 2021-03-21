import User from "../Models/User";
import Produit from "../Models/Produit";
import Exemplaire from "../Models/Exemplaire";

export default class Migration {
    static tables = [
        User,
        Produit,
        Exemplaire
    ];

    static nbRetry = 0;
    static maxRetry = 30;

    static async migrate() {
        this.nbRetry += 1;
        if (this.nbRetry == this.maxRetry) {
            console.log("All database connections retry failed");
            return;
        }
        for (let table of this.tables) {
            try {
                await table.sync();
            } catch(e) {
                console.log("Connection to database failed, retry")
                setTimeout(() => {Migration.migrate()}, 500)
                return;
            }
        }
        console.log("Database synchronized!");
    }
}