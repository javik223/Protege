<?php
namespace Craft;

/**
 * SproutEmail service
 */
class SproutEmail_SproutEmailService extends SproutEmail_EmailProviderService implements SproutEmail_EmailProviderInterfaceService
{
	/**
	 * N/A
	 * 
	 * @return multitype:|multitype:NULL
	 */	
	public function getSubscriberList()
	{
		return array();
	}
	
	/**
	 * Exports campaign (no send)
	 *
	 * @param array $campaign
	 * @param array $listIds
	 */
	public function exportCampaign($campaign = array(), $listIds = array())
	{
		die('Not supported for this provider.');
	}
	
	/**
	 * Exports campaign (with send)
	 *
	 * @param array $campaign
	 * @param array $listIds
	 */
	public function sendCampaign($campaign = array(), $listIds = array())
	{		
		$emailData = array(
				'fromEmail'         => $campaign->fromEmail,
				'fromName'          => $campaign->fromName,
				'subject'           => $campaign->subject,
				'body'              => $campaign->textBody,
		);
		
		if($campaign->htmlBody)
		{
		    $emailData['htmlBody'] = $campaign->htmlBody;
		}
		
		// since we're allowing unchecked variables as replyTo, let's make sure it's a valid email before adding
		if($campaign->replyToEmail && preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $campaign->replyToEmail))
		{
		    $emailData['replyTo'] = $campaign->replyToEmail;
		}
		
		$recipients = explode(",", $campaign->recipients);
		// Craft::dump($emailData);Craft::dump($recipients);die('<br/>To disable test mode and send emails, remove line 57 in ' . __FILE__);
		$emailModel = EmailModel::populateModel($emailData);
		
		$post = craft()->request->getPost();
		foreach($recipients as $recipient)
		{
		    try {
    			$emailModel->toEmail = craft()->templates->renderString($recipient, array('entry' => $post));
    			craft()->email->sendEmail($emailModel);
		    } catch (\Exception $e) {
		        // do nothing
		    }
		}
	}

	/**
	 * Save local recipient list
	 * @param object $campaign
	 * @param object $campaignRecord
	 * @return boolean
	 */
	public function saveRecipientList(SproutEmail_CampaignModel &$campaign, SproutEmail_CampaignRecord &$campaignRecord)
	{
		$recipientIds = array();
			
		// parse and create individual recipients as needed
		if( ! $recipients = array_filter(explode(",", $campaign->recipients)))
		{
			$campaign->addError('recipients', 'You must add at least one valid email.');
			return false;
		}
	
		// validate emails
		$trimmed_recipient_list = array();
		foreach($recipients as $email)
		{		    
		    $email = trim($email);
			$recipientRecord = new SproutEmail_RecipientRecord();	
			$recipientRecord->email = $email;

			if(! preg_match('/{{(.*?)}}/', $email))
			{
				$recipientRecord->validate();
    			if($recipientRecord->hasErrors())
    			{
    				$campaign->addError('recipients', 'Once or more of listed emails are not valid.');
    				return false;
    			};
			}
			
			$trimmed_recipient_list[] = $email;
		}
	
		$campaignRecord->recipients = implode(",", $trimmed_recipient_list);
		$campaignRecord->save();
		
		$this->cleanUpRecipientListOrphans($campaignRecord);
		
		return true;
	}
	
	public function cleanUpRecipientListOrphans(&$campaignRecord)
	{
		// since sproutemail service does not maintain recipient lists, all lists for this 
		// campaign are considered to be orphans
		return craft()->db->createCommand()->delete('sproutemail_campaign_recipient_lists', array('campaignId' => $campaignRecord->id));
	}
	
	/**
	 * Deletes recipients for specified campaign
	 * 
	 * @param SproutEmail_CampaignRecord $campaignRecord
	 * @return bool
	 */
	public function deleteRecipients(SproutEmail_CampaignRecord $campaignRecord)
	{
		// no external recipient list for this service
		return true;
	}
	
	public function getSettings()
	{
	    //
	}
	
	public function saveSettings($settings = array())
	{
	    //
	}
}
