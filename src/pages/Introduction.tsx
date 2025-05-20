import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Avatar,
  Space,
  Divider,
  Timeline,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto">
      <Row gutter={[24, 24]} className="flex flex-col md:flex-row">
        <Col xs={24} md={8}>
          <Card className="text-center mb-6">
            <Avatar size={120} icon={<UserOutlined />} className="mb-4" />
            <Title level={3}>Your Name</Title>
            <Paragraph>Frontend Developer</Paragraph>
            <Space size="middle">
              <Button
                type="link"
                icon={<GithubOutlined />}
                href="https://github.com"
                target="_blank"
              />
              <Button
                type="link"
                icon={<LinkedinOutlined />}
                href="https://linkedin.com"
                target="_blank"
              />
              <Button
                type="link"
                icon={<MailOutlined />}
                href="mailto:your-email@example.com"
              />
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card>
            <Title level={2}>{t('page.introduction.title')}</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Phasellus euismod, nisi vel tincidunt bibendum, nunc
              nisl ultrices nunc, vel lacinia nisl nunc vel nunc. Phasellus
              euismod, nisi vel tincidunt bibendum.
            </Paragraph>
            <Divider />

            <Title level={3}>Skills</Title>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8} md={6}>
                <Card size="small" title="Frontend">
                  <ul className="list-disc list-inside">
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Ant Design</li>
                  </ul>
                </Card>
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Card size="small" title="Backend">
                  <ul className="list-disc list-inside">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>GraphQL</li>
                    <li>MongoDB</li>
                  </ul>
                </Card>
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Card size="small" title="Tools">
                  <ul className="list-disc list-inside">
                    <li>Git</li>
                    <li>Docker</li>
                    <li>Webpack</li>
                    <li>Vite</li>
                  </ul>
                </Card>
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Card size="small" title="Others">
                  <ul className="list-disc list-inside">
                    <li>UI/UX</li>
                    <li>Agile</li>
                    <li>Testing</li>
                    <li>CI/CD</li>
                  </ul>
                </Card>
              </Col>
            </Row>

            <Divider />
            <Title level={3}>Experience</Title>
            <Timeline
              items={[
                {
                  children: (
                    <>
                      <Title level={4}>Senior Frontend Developer</Title>
                      <Paragraph>Company Name, 2020 - Present</Paragraph>
                      <Paragraph>
                        Developed and maintained modern web applications using
                        React, TypeScript and other cutting-edge technologies.
                      </Paragraph>
                    </>
                  ),
                },
                {
                  children: (
                    <>
                      <Title level={4}>Junior Developer</Title>
                      <Paragraph>Previous Company, 2018 - 2020</Paragraph>
                      <Paragraph>
                        Worked on frontend development and gained experience
                        with React and related technologies.
                      </Paragraph>
                    </>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Introduction;
