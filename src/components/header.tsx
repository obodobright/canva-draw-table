
interface HeaderProps {
    setViewPage: (view: string) => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({ setViewPage }) => {

    const deleteAllSavedRectangles = () => {
        localStorage.removeItem("measurements")
        window.location.reload()
        setViewPage("draw")
    }
    return (
        <nav className="header">
            <div className="header_container">
                <h3>Drawing Rectangles</h3>
                <ul className="header_nav">
                    <li role="button" onClick={() => setViewPage("draw")}>
                        Draw
                    </li>
                    <li role="button" onClick={() => setViewPage("view-rectangle")}>
                        View Rectangle
                    </li>
                </ul>

            </div>
            <button className="delete_all_rectangles" onClick={deleteAllSavedRectangles}>Delete all</button>
        </nav>
    )
}

export default HeaderComponent;