import styles from './styles.scss';
import CityWeather from '../components/CityWeather';

export default class extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            weathers: [],
            name: '',
            count: ''
        };
    }

    addCity = () => {
        if (this.state.name.length === 0) {
            alert('Пустое поле');
        } else {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.name}&appid=5aeb3e30cb04b84453644d3c7e90a7e2&&metric=celsius`)
                .then((response) => {
                        if (response.status !== 200) {
                            if (response.status == 404) {
                                alert('Не найдено такого города');
                                return
                            }
                            alert('Произошла ошибка');
                            return;
                        }


                        response.json().then(data => {
                            this.setState(state => {
                                state.weathers = state.weathers.concat(data);
                                state.count++;
                                state.name = '';
                                return state;
                            });
                        });


                    }
                )
                .catch(function (err) {
                    console.log(err);
                });
        }
    };


    clear = () => {
        this.setState({weathers: [], count: 0});
    };

    onChange = (e) => {
        const val = e.target.value;

        if(!/^[a-zA-Z0-9]+$|^$/.test(val)){
            return;
        }

        this.setState(state => {
            state.name = val;
            return state
        });
    };

    deleteWeather = (index) => () => {
        this.setState(state => {
            delete state.weathers[index];
            state.count--;
            return state;
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

