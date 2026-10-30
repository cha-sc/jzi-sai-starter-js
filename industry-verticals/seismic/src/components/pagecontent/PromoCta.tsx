'use client';

import { JSX, useState } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  Link,
  LinkField,
  useSitecore,
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';
import { ComponentProps } from 'lib/component-props';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';

const INDUSTRY_TABS = [
  'Financial Services',
  'Manufacturing',
  'Technology',
  'Life Sciences',
] as const;

interface Fields {
  Eyebrow: Field<string>;
  Title: Field<string>;
  Subtitle: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Link2: LinkField;
}

export type PromoCtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const [isVisible, domRef] = useVisibility();
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component promo-cta ${sxaStyles}`} id={id ? id : undefined} ref={domRef}>
      <div className="container">
        <div className="row row-gap-4 main-content align-items-center">
          <div className="col-lg-5 text-center text-lg-start">
            <h6 className="eyebrow-accent">
              <Text field={props.fields.Eyebrow} />
            </h6>
            <h1 className="display-6 fw-bold mb-3">
              <Text field={props.fields.Title} />
            </h1>
            <div className="promo-cta-text">
              <p className="fs-5">
                <Text field={props.fields.Subtitle} />
              </p>

              <RichText field={props.fields.Text} className="text-content" />

              <div className="row mt-2">
                <Placeholder name="promo-cta" rendering={props.rendering} />
              </div>

              {(isPageEditing || props.fields?.Link?.value?.href) && (
                <Link field={props.fields.Link} className="button button-main mt-3 me-4" />
              )}
              {(isPageEditing || props.fields?.Link2?.value?.href) && (
                <Link field={props.fields.Link2} className="button button-simple mt-3 " />
              )}
            </div>
          </div>
          <div className="col-md-10 mx-auto col-lg-7 mx-lg-0">
            <div className="image-wrapper">
              <DottedAccent className="dotted-accent-top" />
              <NextImage
                field={props.fields.Image}
                className={`d-block mx-lg-auto img-fluid ${
                  !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
                }`}
                width={900}
                height={900}
              />
              <DottedAccent className="dotted-accent-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithPlaceholderColumn = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const [isVisible, domRef] = useVisibility();
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component promo-cta with-placeholder-column ${sxaStyles}`}
      id={id ? id : undefined}
      ref={domRef}
    >
      <div className="container">
        <div className="row row-gap-4 main-content align-items-center">
          <div className="col-lg-5 text-center text-lg-start">
            <h6 className="eyebrow-accent">
              <Text field={props.fields.Eyebrow} />
            </h6>
            <h1 className="fs-1 fw-bold mb-3">
              <Text field={props.fields.Title} />
            </h1>
            <div className="promo-cta-text">
              <p className="fs-5">
                <Text field={props.fields.Subtitle} />
              </p>

              <RichText field={props.fields.Text} className="text-content" />

              {(isPageEditing || props.fields?.Link?.value?.href) && (
                <Link field={props.fields.Link} className="button button-main mt-3" />
              )}
              {(isPageEditing || props.fields?.Link2?.value?.href) && (
                <Link field={props.fields.Link2} className="button button-simple mt-3 mx-4" />
              )}
            </div>
          </div>

          <div className="col-md-12 mx-auto col-lg-7 mx-lg-0">
            <div className="row align-items-center">
              <div className="promo-cta-placeholder col-12 col-md-9">
                <div className="promo-cta-placeholder-inner">
                  <div className="row">
                    <Placeholder name="promo-cta" rendering={props.rendering} />
                  </div>
                </div>
              </div>

              <div className="image-wrapper d-none d-md-block col-md-8">
                <DottedAccent className="dotted-accent-top" />
                <NextImage
                  field={props.fields.Image}
                  className={`d-block mx-lg-auto img-fluid ${
                    !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
                  }`}
                  width={900}
                  height={900}
                />
                <DottedAccent className="dotted-accent-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithBackgroundImage = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component promo-cta with-background-image ${sxaStyles}]`}
      id={id ? id : undefined}
      style={{
        backgroundImage: `url("${props.fields.Image.value?.src}")`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center main-content">
          <div className="col-12 mx-auto">
            <h1 className="display-3 fw-bold text-center mb-3">
              <Text field={props.fields.Title} />
            </h1>
            <div className="fs-3 text-center">
              <RichText field={props.fields.Text} />

              {(isPageEditing || props.fields?.Link?.value?.href) && (
                <Link field={props.fields.Link} className="button button-main mt-3" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* *************************************************************** */
/* SEISMIC — webinar Why Attend + register form card */
export const WhyAttendRegister = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const sessions = (props.params?.Sessions || 'Friday, 23 October|Monday, 16 November|Friday, 4 December').split(
    '|'
  );

  return (
    <section
      className={`component promo-cta seismic-why-attend ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-why-attend__inner">
        <div className="seismic-why-attend__copy">
          <h2 className="seismic-why-attend__title">
            <Text field={props.fields.Title} />
          </h2>
          <div className="seismic-why-attend__text">
            <RichText field={props.fields.Text} />
          </div>
          {(isPageEditing || props.fields?.Link?.value?.href) && (
            <Link field={props.fields.Link} className="seismic-why-attend__cta" />
          )}
        </div>
        <aside className="seismic-why-attend__form-card" aria-label="Registration">
          <h3 className="seismic-why-attend__form-title">
            <Text field={props.fields.Subtitle} />
          </h3>
          <form
            className="seismic-why-attend__form"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <label className="seismic-why-attend__field">
              <span className="visually-hidden">Work Email</span>
              <input type="email" placeholder="Work Email" required />
            </label>
            <label className="seismic-why-attend__field">
              <span className="visually-hidden">Company Name</span>
              <input type="text" placeholder="Company Name:" required />
            </label>
            <label className="seismic-why-attend__field">
              <span className="visually-hidden">Country</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select...
                </option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
            </label>
            <p className="seismic-why-attend__sessions-label">
              Please select which upcoming sessions you would like to attend:
            </p>
            <div className="seismic-why-attend__sessions">
              {sessions.map((session) => (
                <label key={session} className="seismic-why-attend__session">
                  <input type="checkbox" name="session" value={session} />
                  <span>{session}</span>
                </label>
              ))}
            </div>
            {(isPageEditing || props.fields?.Link2?.value?.href) ? (
              <Link field={props.fields.Link2} className="seismic-why-attend__submit" />
            ) : (
              <button type="submit" className="seismic-why-attend__submit">
                Register Now →
              </button>
            )}
          </form>
        </aside>
      </div>
    </section>
  );
};

/* *************************************************************** */
/* SEISMIC — Meet Your Host (photo + bio) */
export const MeetHost = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component promo-cta seismic-meet-host ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-meet-host__inner">
        <h2 className="seismic-meet-host__heading">
          <Text field={props.fields.Eyebrow} />
        </h2>
        <div className="seismic-meet-host__row">
          <div className="seismic-meet-host__photo">
            <NextImage
              field={props.fields.Image}
              className="seismic-meet-host__img"
              width={360}
              height={360}
            />
          </div>
          <div className="seismic-meet-host__bio">
            <h3 className="seismic-meet-host__name">
              <Text field={props.fields.Title} />
            </h3>
            <p className="seismic-meet-host__role">
              <Text field={props.fields.Subtitle} />
            </p>
            <div className="seismic-meet-host__text">
              <RichText field={props.fields.Text} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* *************************************************************** */
/* SEISMIC — checklist section (Who Should Attend / What You'll Learn) */
export const ChecklistSection = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component promo-cta seismic-checklist ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-checklist__inner">
        <h2 className="seismic-checklist__title">
          <Text field={props.fields.Title} />
        </h2>
        {(isPageEditing || props.fields?.Subtitle?.value) && (
          <p className="seismic-checklist__intro">
            <Text field={props.fields.Subtitle} />
          </p>
        )}
        <div className="seismic-checklist__body">
          <RichText field={props.fields.Text} />
        </div>
        {(isPageEditing || props.fields?.Link?.value?.href) && (
          <p className="seismic-checklist__outro">
            <Link field={props.fields.Link} />
          </p>
        )}
      </div>
    </section>
  );
};

/* *************************************************************** */
/* SEISMIC — industry tabs over FS promo panel (other tabs visual) */
export const IndustryTabs = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const [activeTab, setActiveTab] = useState<string>(INDUSTRY_TABS[0]);

  return (
    <section
      className={`component promo-cta seismic-industry-tabs ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-industry-tabs__inner">
        {(isPageEditing || props.fields?.Eyebrow?.value) && (
          <h2 className="seismic-industry-tabs__eyebrow">
            <Text field={props.fields.Eyebrow} />
          </h2>
        )}
        <div
          className="seismic-industry-tabs__tabs"
          role="tablist"
          aria-label="Solutions by Industry"
        >
          {INDUSTRY_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`seismic-industry-tabs__tab${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <div className="seismic-industry-tabs__panel" role="tabpanel">
          <div className="seismic-industry-tabs__copy">
            {(isPageEditing || props.fields?.Subtitle?.value) && (
              <p className="seismic-industry-tabs__label">
                <Text field={props.fields.Subtitle} />
              </p>
            )}
            <h3 className="seismic-industry-tabs__title">
              <Text field={props.fields.Title} />
            </h3>
            <div className="seismic-industry-tabs__text">
              <RichText field={props.fields.Text} />
            </div>
            {(isPageEditing || props.fields?.Link?.value?.href) && (
              <Link field={props.fields.Link} className="seismic-industry-tabs__cta" />
            )}
          </div>
          <div className="seismic-industry-tabs__media">
            <NextImage
              field={props.fields.Image}
              className="seismic-industry-tabs__img"
              width={900}
              height={900}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
