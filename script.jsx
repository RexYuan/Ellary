var bank = [
    {
        "id": 0,
        "word": "foudroyant",
        "meaning": "sudden and overwhelming in effect"
    },
    {
        "id": 1,
        "word": "propinquity",
        "meaning": "nearness of blood"
    },
    {
        "id": 2,
        "word": "idyllic",
        "meaning": "charmingly simple or rustic"
    },
    {
        "id": 3,
        "word": "exasperate",
        "meaning": "to irritate or provoke to a high degree"
    },
    {
        "id": 4,
        "word": "purview",
        "meaning": "the range of operation"
    }
];

function setQuestion () {
    var temp = [];
    var tempNums = [];
    var answerIndex = Math.floor(Math.random() * 4);
    while (temp.length < 4) {
        var randKey = Math.floor(Math.random() * bank.length);
        if ($.inArray(randKey, tempNums) == -1) {
            bank[randKey].revealed = false;
            bank[randKey].correct = (answerIndex == temp.length) ? true : false;
            temp.push(bank[randKey]);
            tempNums.push(randKey);
        }
    }
    return [temp[answerIndex], temp];
}

var MainBox = React.createClass({
    getInitialState: function () {
        var temp = setQuestion();
        var answer = temp[0];
        var options = temp[1];
        return {answer: answer, options: options};
    },
    handleOptionBoxClick: function (idClicked) {
        for (var i = 0; i < this.state.options.length; i++)
        {
            if (idClicked == this.state.options[i].id)
            {
                this.state.options[i].revealed = true;
                this.setState({options: this.state.options});
                break;
            }
        }
    },
    handleResetBoxClick: function () {
        this.replaceState(this.getInitialState())
    },
    render: function () {
        return (
            <div className="MainBox">
                <QuestionBox answer={this.state.answer} />
                <AnswerBox options={this.state.options} handleOption={this.handleOptionBoxClick}/>
                <ResetBox onClick={this.handleResetBoxClick} />
            </div>
        );
    }
});

var QuestionBox = React.createClass({
    render: function () {
        return (
            <div className="QuestionBox">
                {this.props.answer.word}
            </div>
        );
    }
});

// TODO: how does this "bind" works?
var AnswerBox = React.createClass({
    render: function () {
        var optionBoxes = this.props.options.map(function(option) {
            return (
                <OptionBox key={option.id} onClick={this.props.handleOption.bind(null, option.id)} revealed={option.revealed} correct={option.correct}>
                    {option.meaning}
                </OptionBox>
            );
        }.bind(this));
        return (
            <div className="AnswerBox">
                {optionBoxes}
            </div>
        );
    }
});

var OptionBox = React.createClass({
    render: function () {
        var revelation = "unrevealedOption";
        if (this.props.revealed)
        {
            if (this.props.correct)
            {
                revelation = "correctOption";
            }
            else
            {
                revelation = "incorrectOption";
            }
        }
        return (
            <div className={revelation} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
});

var ResetBox = React.createClass({
    render: function () {
        return (
            <div className="ResetBox" onClick={this.props.onClick}>
                NEXT
            </div>
        );
    }
});

ReactDOM.render(
  <MainBox />,
  document.getElementById('content')
);
