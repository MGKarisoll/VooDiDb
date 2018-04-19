import match            from 'autosuggest-highlight/match';
import parse            from 'autosuggest-highlight/parse';
import React            from 'react';
import ReactDOM         from 'react-dom';

import Autosuggest      from 'react-autosuggest';
import { MenuItem }     from 'material-ui/Menu';
import Paper            from 'material-ui/Paper';
import Request          from '../services/request';
import TextField        from 'material-ui/TextField';
import { withStyles }   from 'material-ui/styles';



function renderInput(inputProps) {
    const { classes, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 500 }}>
                                {part.text}
                            </strong>
                        );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(value, suggestions) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
        height: 250,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
});

class IntegrationAutosuggest extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            data: [],
            value: '',
            suggestions: [],
        };
    }


    componentDidMount = async () => {
        const response = await Request.get('/api/departments');
        this.setState({
            data: response.Items.map(item => ({ label: item.Name, value: item.Id }))
        });
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.state.data),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        const item = this.state.data.find(x => x.label === newValue);
        this.setState({
            value: newValue
        });

        if(item) {
            const e = new Event('change');
            const el = ReactDOM.findDOMNode(this);
            el.value = item.value;
            if(el.dispatchEvent(e)) {
                this.props.onChange(e);
            }
        }        
    };

    onChange(newValue) {
        console.log("IntegrationAutosuggest", newValue);
    }

    render() {
        const { classes } = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    classes,
                    placeholder: 'Search a country (start with a)',
                    value: this.state.value,
                    onChange: this.handleChange,
                }}
            />                  
        );
    }
}

export default withStyles(styles)(IntegrationAutosuggest);