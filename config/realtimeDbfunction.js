import {ref, set} from "firebase/database"
import {db} from "./firebase"

function create (){
    set(ref(db, "users/" + username))
}