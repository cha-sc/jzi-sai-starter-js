'use client';

import { useState, JSX } from 'react';
import { Field, RichText, Text } from '@sitecore-content-sdk/nextjs';

interface QuestionFields {
  Question: Field<string>;
  Answer: Field<string>;
}

export type QuestionItemProps = {
  fields: QuestionFields;
  name: string;
  url: string;
};

export type QuestionsProps = {
  params: { [key: string]: string };
  fields: {
    items: QuestionItemProps[];
  };
};

const Question = ({
  item,
  iconStyle = 'chevron',
}: {
  item: QuestionItemProps;
  iconStyle?: 'chevron' | 'plus';
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`question-item ${isExpanded ? 'is-open' : ''}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`button-clear-appearance ${isExpanded ? 'expanded' : ''}`}
        aria-expanded={isExpanded}
      >
        <h3>
          <Text field={item.fields.Question} />
        </h3>
        <span className="icon-wrapper" aria-hidden="true">
          {iconStyle === 'plus' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} fill="none" stroke="currentColor" strokeWidth="2">
              {isExpanded ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={23} fill="currentColor">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          )}
        </span>
      </button>
      <div className={`answer ${isExpanded ? 'd-block' : 'd-none'}`}>
        <RichText field={item.fields.Answer} />
      </div>
    </div>
  );
};

export const Default = (props: QuestionsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const questions = props.fields?.items;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component questions ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            {questions
              ?.filter((_, index) => index % 2 === 0)
              ?.map((item) => (
                <Question key={item.url} item={item} />
              ))}
          </div>
          <div className="col-sm-12 col-lg-6">
            {questions
              ?.filter((_, index) => index % 2 !== 0)
              ?.map((item) => (
                <Question key={item.url} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SingleColumn = (props: QuestionsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const questions = props.fields?.items;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component questions single-column ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="questions-wrapper">
          {questions?.map((item) => (
            <Question key={item.url} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* Elite Term — full-width FAQ rows with plus/minus icons */
export const EliteTermFaq = (props: QuestionsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const questions = props.fields?.items;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component questions elite-term-faq ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="elite-term-faq__inner">
        {questions?.map((item) => (
          <Question key={item.url} item={item} iconStyle="plus" />
        ))}
      </div>
    </section>
  );
};
