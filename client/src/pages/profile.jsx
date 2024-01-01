import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


function ProfilePage(){
    return(
        // remember to do the bootstrap
        <>
        <section id='profile'>
            <h1>Hello 
                <b>Username will go here</b>
            </h1>
        {/* for a user to selection options like cards friends settins etc */}
            <nav>

            </nav>

            <div id='cardContainer'>
            {/* export from different file and call in props like in the examps  */}
            </div>
        </section>
        </>
    )
}

export default ProfilePage