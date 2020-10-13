<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController {
    
    /**
     * @Route("/api/users", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsers() {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
    
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $json = json_encode($users);
        $response->setContent($json);
        
        return $response;
    }

    /**
     * @Route("/api/user/new", name="new_user")
     * @param $request
     */
    public function createUser(Request $request) {
        $manager = $this->getDoctrine()->getManager();
        
        $data = json_decode($request->getContent());

        $user = new User();
        $user->setMail($data->{'email'});
        $user->setLastName($data->{'lastName'});
        $user->setFirstName($data->{'firstName'});
        $user->setDepartment($data->{'department'});
        $password = $this->randomPassword();
        $user->setPassword($password);
        $user->setRole(0);



        $manager->persist($user);
        
        $manager->flush();

        $this->sendEmail($password,$data->{'email'});

        return new Response;
    }



    public function isEmailUnique($field) {

    }

    public function sendEmail(MailerInterface $mailer,  $userPassword, $userEmail )
    {
        $email = (new Email())
            ->from('rh.laplatefore@gmail.com')
            ->to($userEmail)
            ->subject('')
            ->html('<p>Voici votre mot de passe pour accèder à la plateforme EMS : '.$userPassword. '</p>');

        $mailer->send($email);

        
    }

    public function randomPassword() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array();
        $alphaLength = strlen($alphabet) - 1;
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass);
    }
}
