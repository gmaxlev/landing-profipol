<?php

    /* 
        Список адресов
    */
    $recipients = array(
        "gmaxlev@gmail.com"
       
    );


    if (!isset($_POST['form'])) exit;
    $form_formname = htmlspecialchars(trim($_POST['form']));
    
    if ($form_formname=="Форма №1") {
        $text_message ='';
  
        $form_name = htmlspecialchars(trim($_POST['name']));
        $form_phone = htmlspecialchars(trim($_POST['phone']));
        $form_email = htmlspecialchars(trim($_POST['email']));
        
        $text_message = "
            Форма: ".$form_formname ." <br>
            Имя: ".$form_name ." <br>
            Номер телефона: ".$form_phone ." <br>
            E-mail: ".$form_email ."
        ";
    }

    
    $mail['charset'] = "utf-8";
    $mail['to'] = implode(',', $recipients);
    $mail['subject'] = 'Новый клиент!';
    $mail['massage'] = $text_message;
    
    $mail['header'] = "MIME-Version: 1.0\n"
    ."X-Priority: 3\n"
    ."X-Mailer: Mailer\n"
    ."Content-Transfer-Encoding: 8bit\n"
    ."Content-Type: text/html; charset=" . $mail['charset'] . "\n";
    
    mail ($mail['to'], $mail['subject'], $mail['massage'], $mail['header']);
    

?>