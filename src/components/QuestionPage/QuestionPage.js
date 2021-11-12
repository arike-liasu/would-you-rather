import React, { useState } from 'react';
import { connect } from 'react-redux';
import avatar from '../../images/male-avatar.png';
import { useParams } from 'react-router';

import './QuestionPage.css';
import { handleAddAnswer } from '../../actions/Questions';

const QuestionPage = (props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const questionId = useParams().id.slice(3);
  const question = props.questions[questionId];
  const users = props.users;
  const userId = props.authedUserId;
  const authorId = question.author;

  console.log(question);
  console.log(questionId);
  console.log(selectedOption);

  const time = question.timestamp;
  const date = new Date(time).toLocaleDateString('en-US');

  const option1Votes = question.optionOne.votes;
  const option2Votes = question.optionTwo.votes;
  //const totalVotes = option1Votes.length + option2Votes.length;

  return option2Votes.includes(userId) || option1Votes.includes(userId) ? (
    <div className='question-page'>
      <div className='question-card'>
        <img src={avatar} alt='' className='question-image' />
        <h2 className='question-user'>{users[authorId].name || 'User name'}</h2>
        <p className='question-date'>{date || '2020'}</p>

        <h2>Would you rather...</h2>
        <h3>Result</h3>
        <div className='question-options'>
          <p className='question-option'>
            {'Option1: ' + question.optionOne.text || 'Be Telepathic'}
          </p>
          <span className='question-vote'>
            {'Votes: ' + option1Votes.length}
          </span>
        </div>

        <div className='question-options'>
          <p className='question-option'>
            {'Option2: ' + question.optionTwo.text || 'Be Telepathic'}
          </p>
          <span className='question-vote'>
            {'Votes: ' + option2Votes.length}
          </span>
        </div>
        <p>
          {'You voted for ' +
            (option1Votes.includes(userId) ? 'Option 1' : 'Option 2')}
        </p>
      </div>
    </div>
  ) : (
    <div className='question-page'>
      <div className='question-card'>
        <img src={avatar} alt='' className='question-image' />
        <h2 className='question-user'>{users[authorId].name || 'User name'}</h2>
        <p className='question-date'>{date || '2020'}</p>

        <h2>Would you rather...</h2>
        <select
          className='select-option'
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <option value='' disabled>
            Select an option...
          </option>
          <option value='optionOne'>
            {question.optionOne.text || 'Be Telepathic'}
          </option>
          <option value='optionTwo'>
            {question.optionTwo.text || 'Be Telekinetic'}
          </option>
        </select>

        <button
          className='view-button button'
          onClick={() => {
            props.dispatch(handleAddAnswer(selectedOption, questionId));
          }}
        >
          Submit Option
        </button>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUserId: authedUser.id,
    users,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionPage);
