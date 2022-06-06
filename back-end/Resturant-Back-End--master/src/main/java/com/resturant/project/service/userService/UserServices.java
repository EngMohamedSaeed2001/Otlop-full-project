package com.resturant.project.service.userService;

import com.resturant.project.HelperMessage;
import com.resturant.project.model.CartOperations.SubmitCartRequest;
import com.resturant.project.model.entity.*;
import com.resturant.project.model.requestBody.ContactReq;
import com.resturant.project.model.requestBody.OrderRequest;
import com.resturant.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class UserServices {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private ContactRepository contactRepository;


    public void addContactInfo(ContactReq contactReq) {
        contactRepository.save(ContactUs.builder()
                .firstName(contactReq.getFirstName())
                .message(contactReq.getMessage())
                .secondName(contactReq.getSecondName())
                .subject(contactReq.getSubject())
                .email(contactReq.getEmail())
                .build());
    }

    public void cleanCart(String email){
        Cart cart = cartRepo.findCartByUserEmail(email);
        if (cart != null){
            List<OrderItem> orderItems = cart.getOrders();
            cart.getOrders().clear();
            cartRepo.save(cart);
            orderRepository.deleteAll(orderItems);

        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.USER_DOES_NOT_HAVE_CART);
    }



    public Cart getCart(String userEmail) {
        Cart cart = cartRepo.findCartByUserEmail(userEmail);
        if (cart != null) return cart;
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.USER_DOES_NOT_HAVE_CART);
    }

    public void orderItem(OrderRequest orderRequest) {
        Item item = itemRepository.findByItemName(orderRequest.getItemName());

        if (item == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.ITEM_NOT_FOUND);

        Cart cart = cartRepo.findCartByUserEmail(orderRequest.getUserEmail());
        if (cart == null) {
            cart = Cart.builder()
                    .userEmail(orderRequest.getUserEmail())
                    .orders(new ArrayList<>())
                    .build();
        }
        OrderItem order = OrderItem.builder()
                .itemName(item.getItemName())
                .calories(item.getCalories())
                .price(item.getPrice())
                .fats(item.getFats())
                .des(item.getDes())
                .img(item.getImg())
                .email(orderRequest.getUserEmail())
                .quantity(orderRequest.getQuantity())
                .size(orderRequest.getSize())
                .build();
        OrderItem orderItem1 = orderRepository.findOrderItemByEmailAndItemName(order.getEmail(), order.getItemName());
        if (orderItem1 != null) {
            for (OrderItem orderItem : cart.getOrders()) {
                if (orderItem.getItemName().equals(order.getItemName())) {
                    cart.getOrders().remove(orderItem);
                    cartRepo.save(cart);
                    order.setId(orderItem1.getId());
                    cart.getOrders().add(order);
                    break;
                }
            }
        } else
            cart.getOrders().add(order);

        cartRepo.save(cart);
    }

    public void deleteItem(String itemName, String email) {

        OrderItem order = orderRepository.findOrderItemByEmailAndItemName(email,itemName);
        if (order == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.ITEM_NOT_FOUND);

        Cart cart = cartRepo.findCartByUserEmail(email);

        if (cart == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.CART_NOT_FOUND);

        if (cart.getOrders().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.EMPTY_CART);
        else if (!cart.getOrders().contains(order))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.ITEM_NOT_FOUND);
        else {
            cart.getOrders().remove(order);
        }

        cartRepo.save(cart);
        orderRepository.delete(order);
    }

    public Double orderCart(SubmitCartRequest request) {
        Cart cart = cartRepo.findCartByUserEmail(request.getUserEmail());
        StringBuilder soledItems = new StringBuilder();
        if (cart == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.CART_NOT_FOUND);
        double totalPrice = 0.0;
        List<OrderItem> allOrders = orderRepository.findAllByEmail(request.getUserEmail());
        for (OrderItem order : allOrders) {
            if (cart.getOrders().contains(order)) {
                if (order.getPrice() == 0)
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.QUANTITY_ERROR);
                totalPrice += order.getQuantity() * order.getPrice();
                soledItems.append(order.getItemName()).append("|").append(order.getPrice()).append("|").append(order.getQuantity()).append("|");
            }
        }
        if (totalPrice == 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.ITEM_NOT_FOUND);

        orderDetailRepo.save(OrderDetail.builder()
                .soledItems(soledItems.toString())
                .userEmail(request.getUserEmail())
                .orderPrice(totalPrice)
                .phone(request.getPhone())
                .address(request.getAddress())
                .orderTime(new Date(System.currentTimeMillis()))
                .build()
        );
        cart.setAddress(request.getAddress());
        cart.setPhone(request.getPhone());
        cartRepo.save(cart);
        return totalPrice;
    }

    public List<Item> search(String name) {
        List<Item> items = itemRepository.findAll();
        items.removeIf(item -> !item.getItemName().contains(name));
        return items;
    }
}
