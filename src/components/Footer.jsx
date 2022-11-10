function Footer() {
    return (<footer className="page-footer grey darken-4">
        <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} Copyright Text
                <a className="grey-text text-lighten-4 right"
                   target="_blank" href="https://23nazaryan.github.io/react-shop/" rel="noreferrer">Repo</a>
            </div>
        </div>
    </footer>)
}

export default Footer