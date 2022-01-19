import { useContext } from 'react';

import './side.filter.component.style.scss'

// ContextAPI
import { MainContext } from '../../context/main-context/main.context';

export default function SideFilterComponent() {

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    return (
        <>
            <div id="sideContainer" className={`${darkMode ? "sidenav-bg-dark font-dark" : "sidenav-bg-light font-light"}`}>
                Filterdan selam
            </div>
        </>

    )
}
