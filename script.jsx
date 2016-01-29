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

function getOptions () {
    var temp = [];
    var tempNums = [];
    while (temp.length < 4) {
        var randKey = Math.floor(Math.random() * bank.length);
        if ($.inArray(randKey, tempNums) == -1) {
            temp.push(bank[randKey]);
            tempNums.push(randKey);
        }
    }
    return temp;
}

var MainBox = React.createClass({
    getInitialState: function () {
        var options = getOptions();
        var answerKey = Math.floor(Math.random() * options.length);
        return {answerKey: answerKey, options: options};
    },
    componentDidMount: function () {
        return;
    },
    render: function () {
        return (
            <div className="MainBox">
                <QuestionBox answerKey={this.state.answerKey} options={this.state.options} />
                <AnswerBox answerKey={this.state.answerKey} options={this.state.options} />
            </div>
        );
    }
});

var QuestionBox = React.createClass({
    render: function () {
        return (
            <div>
                <h1>{this.props.options[this.props.answerKey].word}</h1>
            </div>
        );
    }
});

var AnswerBox = React.createClass({
    render: function () {
        var optionBoxes = this.props.options.map(function(option) {
            return (
                <OptionBox>
                    {option.meaning}
                </OptionBox>
            );
        });
        return (
            <div>
                {optionBoxes}
            </div>
        );
    }
});

var OptionBox = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

ReactDOM.render(
  <MainBox />,
  document.getElementById('content')
);
