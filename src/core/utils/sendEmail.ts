import * as MailComposer from 'expo-mail-composer';

const sendEmail = async ({
	attachments,
	bccRecipients,
	body,
	ccRecipients,
	isHtml,
	recipients,
	subject,
}: MailComposer.MailComposerOptions): Promise<MailComposer.MailComposerResult> => {
	return MailComposer.composeAsync({
		attachments,
		bccRecipients,
		body,
		ccRecipients,
		isHtml,
		recipients,
		subject,
	});
};

export default sendEmail;
