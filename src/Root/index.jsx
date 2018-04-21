import {connect} from 'react-redux';

import styles from './styles.scss';

import CityWeather from '../components/CityWeather';
import actions from 'store/actions';


class Root extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            name: '',
            isLoad: false
        };
    }

    addCity = () => {
        if (this.state.name.length === 0) {
            alert('Пустое поле');
            return;
        }
        this.setState({isLoad: true});
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.name}&appid=5aeb3e30cb04b84453644d3c7e90a7e2&&metric=celsius`;
        fetch(url).then(response => {
            this.setState({isLoad: false});
            const {status} = response;
            if (status === 404) {
                alert('Не найдено такого города');
                throw new Error('error');
            }

            if (status === 200) {
                return response.json();
            }
        }).then(data => {
            this.setState({
                name: ''
            });
            if (this.props.store.weathers.get(data.id)) {
                alert('Вы уже добавили этот город');
            } else {
                this.props.actions.addWeather({data});
            }
        }).catch(err => {
            this.setState({isLoad: false});
            console.log(err);
        });

    };

    clear = () => {
        this.props.actions.clearWeather();
    };

    onChange = (e) => {
        const val = e.target.value;

        if (!/^[a-zA-Z0-9]+$|^$/.test(val)) {
            return;
        }

        this.setState({
            name: val
        });
    };

    deleteWeather = id => () => {
        this.props.actions.deleteWeather({id})
    };

    render() {
        const weathers = this.props.store.weatherIds.map((id) => {
            return <CityWeather
                key={id}
                weather={this.props.store.weathers.get(id)}
                deleteWeather={this.deleteWeather(id)}/>
        });
        return (
            <div className={styles.container}>
                <input type="text" value={this.state.name} onChange={this.onChange} className={styles['input-city']}/>
                <button className={styles['btn-add']} onClick={this.addCity}>Add</button>
                <button className={styles['btn-clear']} onClick={this.clear}>Clear</button>
                {(this.props.store.weatherIds.size === 0) &&
                <div className={styles['empty-dashboard']}>Dashboard is empty</div>}
                <div className={styles['container-weather']}>
                    {weathers}
                    {this.state.isLoad && <CityWeather load={true}/>}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        store: {
            weathers: store.weathers,
            weatherIds: store.weatherIds
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            addWeather: data => dispatch(actions.addWeather(data)),
            deleteWeather: data => dispatch(actions.deleteWeather(data)),
            clearWeather: () => dispatch(actions.clearWeather())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
