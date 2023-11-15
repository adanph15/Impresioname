import "./Header.css";
import { faUser , faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
    return (
        <>
            <body>
                <div className="header-container">
                    <p>=</p>
                    <h1>IMPRESIÓNAME</h1>
                    <a><FontAwesomeIcon icon={faUser} size="xl"/></a>
                    <a><FontAwesomeIcon icon={faCartShopping} size="xl"/></a>
                </div>
            </body>
        </>
    );
}
