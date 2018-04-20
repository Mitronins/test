import {connect} from 'react-redux';

import styles from './styles.scss';

import CityWeather from '../components/CityWeather';
import actions from 'store/actions';


class Root extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            weathers: [],
            name: '',
            count: 0
        };

        this.props.actions.addWeather('pis')
    }

    addCity = () => {
        if (this.state.name.length === 0) {
            alert('Пустое поле');
            return;
        }


        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.name}&appid=5aeb3e30cb04b84453644d3c7e90a7e2&&metric=celsius`).then(response => {
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
                weathers: this.state.weathers.concat(data),
                count: ++this.state.count,
                name: ''
            });
        }).catch(err => {
            console.log(err);
        });

    };

    clear = () => {
        this.setState({weathers: [], count: 0});
    };

    onChange = (e) => {
        const val = e.target.value;

        if (!/^[a-zA-Z0-9]+$|^$/.test(val)) {
            return;
        }

        this.setState({
            weathers: this.state.weathers,
            name: val,
            count: this.state.count
        });
    };

    deleteWeather = (index) => () => {
        delete this.state.weathers[index];
        this.state.count--;
        this.setState({
            weathers: this.state.weathers,
            name: this.state.name,
            count: this.state.count
        })
    };

    render() {
        const weathers = this.state.weathers.map((weather, index) => {
            return <CityWeather key={index} weather={weather} deleteWeather={this.deleteWeather(index)}/>
        });
        return (
            <div className={styles.container}>
                <input type="text" value={this.state.name} onChange={this.onChange} className={styles['input-city']}/>
                <button className={styles['btn-add']} onClick={this.addCity}>Add</button>
                <button className={styles['btn-clear']} onClick={this.clear}>Clear</button>
                {(this.state.count === 0) &&
                <div className={styles['empty-dashboard']}>Dashboard is empty</div>}
                <div className={styles['container-weather']}>{weathers}</div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        store: {
            weathers: store.weathers
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            addWeather: data => dispatch(actions.addWeather(data)),
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
