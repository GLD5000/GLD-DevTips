import ExternalLink from '../header/ExternalLink';
import GitHubSvg from '../icons/GitHubSvg';
import GLDNegSvg from '../icons/GLDNegSvg';

export default function Footer() {
  return (
    <footer
      id="footer"
      className=" flex w-full flex-shrink-0 flex-grow-0 flex-col flex-wrap gap-2 py-1 text-sm"
    >
      <ExternalLink
        layoutClasses="flex-row gap-2 mx-auto"
        link="https://github.com/GLD5000"
        content={[
          <GLDNegSvg key="svg" />,
          <p key="text" className="m-0 ">
            Part of the GLD Portfolio
          </p>,
        ]}
      />
      <ExternalLink
        layoutClasses="flex-row gap-2 mx-auto"
        link="https://github.com/GLD5000"
        content={[
          <GitHubSvg key="svg" />,
          <p key="text" className="m-0 ">
            GLD5000 on GitHub
          </p>,
        ]}
      />

      <p className=" mx-auto mb-0 w-fit text-txt-mid dark:text-txt-mid-dk">
        🄯 2023 Gareth L Devlin
      </p>
    </footer>
  );
}
