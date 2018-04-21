import styles from './styles.scss';


export default class extends React.Component {
    constructor(props) {
        super(props);
        if (!props.load) {
            this.weather = props.weather;
            this.deleteWeather = props.deleteWeather;
        }
        console.log(this.props.load);
    }

    render() {
        return (
            <div className={styles.container}>
                {!this.props.load && <div>
                    <div className={styles.title}>{this.weather.name}</div>
                    <div className={styles.temp}>{Math.round(this.weather.main.temp - 273.15)}℃</div>
                    <img src={`http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`}/>
                    <button onClick={this.deleteWeather} className={styles['btn-delete']}>delete</button>
                </div>}
                {this.props.load && <div className={styles.spinner}/>}
            </div>)
    }
}


