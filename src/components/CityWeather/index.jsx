import styles from './styles.scss';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.weather = props.weather;
        this.deleteWeather = props.deleteWeather;
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>{this.weather.name}</div>
                <div className={styles.temp}>{Math.round(this.weather.main.temp - 273.15)}℃</div>
                <img src={`http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`}/>
                <button onClick={this.deleteWeather} className={styles['btn-delete']}>delete</button>
            </div>
        )
    }


}