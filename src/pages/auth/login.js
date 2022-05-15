import {
  SEO,
  ContentWrapper,
  EntryHeader,
  Header,
  Footer,
  Main,
  LoginForm,
} from 'components';

export default function Page() {
  return (
    <>
      <SEO
        title="Login"
      />

      <Header />
      <Main>
        <EntryHeader
          title="Login"
        />
        <div className="container">
          <ContentWrapper>
            <LoginForm />
          </ContentWrapper>
        </div>
      </Main>

      <Footer />
    </>
  );
}
