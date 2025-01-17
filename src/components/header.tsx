
interface HeaderProps {
    viewPage: string;
    setViewPage: (view: string) => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({ viewPage, setViewPage }) => {

    const deleteAllSavedRectangles = () => {
        localStorage.removeItem("measurements")
        window.location.reload()
        setViewPage("draw")
    }
    return (
        <nav className="header">
            <div className="header_container">
                {/* LOGO */}
                <h3>Drawing Rectangles</h3>
                <ul className="header_nav">
                    <li className={viewPage === "draw" ? "is_active" : ""} role="button" onClick={() => setViewPage("draw")}>
                        Draw
                    </li>
                    <li className={viewPage === "view-rectangle" ? "is_active" : ""} role="button" onClick={() => setViewPage("view-rectangle")}>
                        View Rectangles
                    </li>
                </ul>

            </div>
            <button className="delete_all_rectangles" onClick={deleteAllSavedRectangles}>Delete all</button>
        </nav>
    )
}

export default HeaderComponent;