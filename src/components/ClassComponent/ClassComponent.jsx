import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) +
                    this.props.min,
      count: 0,
      isGuess: false,
      isInputDisabled: false,
    };
  }

  /* Обработка события на форме */
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber}, попыток ${state.count}`,
        isGuess: true,
        isInputDisabled: true,
      };
    });

    /* Очистка input после срабатывания события на форме */
    this.setState(() => ({
      userNumber: '',
    }));
  };

  handleChange = e => {
    this.setState(() => ({
      userNumber: e.target.value,
    }));
  };

  /*
    Рестарт: игра с начала, обнуление попыток, новое рандомное число
    count: -1, так как при клике на кнопку срабатывает событие НА ФОРМЕ,
    и количество попыток уже становится = 1
  */
  handleRestart = () => {
    this.setState(() => ({
      randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) +
                    this.props.min,
      count: -1,
      isGuess: false,
      isInputDisabled: false,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
            disabled={this.state.isInputDisabled}
          />

          {this.state.isGuess ?
            <button className={style.btnAgain} onClick={this.handleRestart}>Сыграть ещё</button> :
            <button className={style.btn}>Угадать</button>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
