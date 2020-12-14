import React from "react";
import { withRouter, matchPath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { changeSelectedStage, setSearchName } from "../../store/actions";

const Header = ({history}) => {
    const route = matchPath(history.location.pathname, { path: '/:route' });
    const selectedStage = useSelector(state => state.selectedStage);
    const dispatch = useDispatch();
    if(!route || !route.params.route.includes("selected"))
        dispatch(changeSelectedStage(0));
    else if(route && route.params.route.includes("selected") && selectedStage == 0)
        dispatch(changeSelectedStage(1));
    return(
        <header className="header-landing">
            <div className="header-top">
                <div className="header-logo">
                    <img style={{ width: '200px' }} src="/assets/logo.png" alt=""/>
                </div>
                <nav className="header-nav">
                    <Link to="/"><span style={ !route || !route.params.route.includes('about-us') && !route.params.route.includes('selected') ? {color: '#EB5757'} : null}>Главная</span></Link>
                    <Link to="/about-us"> <span style={route && route.params.route.includes('about-us') ? {color: '#EB5757'}: null}> О нас</span> </Link>
                    <Link to="/selected" onClick={() => dispatch(changeSelectedStage(1))} > <span style={route && route.params.route.includes('selected') ? {color: '#EB5757'}: null}> Корзина</span> </Link>
                </nav>
                <div className="header-info">
                    <a href="" className="header-phone">+7(777)-777-77-77</a>
                    <p>Справочная 24/7</p>
                </div>
            </div>
            <div className="header-bottom">
                <Input placeholder="Поиск по товарам" onChange={(e) => {
                    if(e.target.value == ""){
                        history.push("/");
                    }
                    else{
                        dispatch(setSearchName(e.target.value));
                        history.push(`/search`);
                    }
                }}/>
            </div>
        </header>
    )
}

export default withRouter(Header);